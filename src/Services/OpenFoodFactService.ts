import axios from "axios";
import Food from "../Models/Food";
import { OpenFoodFactApiProduct, OpenFoodFactApiResponse } from "../Models/OpenFoodFactApiResponse";

export default class OpenFoodFactService {
  private OpenFoodFactBaseUrl = "https://[locale].openfoodfacts.org";
  private OpenFoodFactApiUrlTemplate = `${this.OpenFoodFactBaseUrl}/api/v0/product/[barcode].json`;
  // * barcode to replace
  private barcodeReplaceInTemplate = "[barcode]";
  // * from doc : 
  // *You can either use the global domain (https://world.openfoodfacts.org) or the local domains (https://fr.openfoodfacts.org, https://en.openfoodfacts.org …) for your API queries.
  private domainReplaceInTemplate = "[locale]";

  public async getFoodInformation(barCode: string, locale: string): Promise<Food> {
    const url = this.OpenFoodFactApiUrlTemplate.replace(
      this.barcodeReplaceInTemplate,
      barCode
    ).replace(this.domainReplaceInTemplate, locale);
    const { data } = await axios.get(url);
    // * openFoodFact Api answer with empty code if food do not exists
    if (data.code === "") {
      throw "unknown food";
    }
    const responseData = data as OpenFoodFactApiResponse;
    console.log("resp", responseData);
    const convertedFood = this.mapFoodApiToFood(responseData, locale, barCode);
    return convertedFood;
  }

  // Todo: maybe move this part to a mapper
  public mapFoodApiToFood(apiFood: OpenFoodFactApiResponse, locale: string, barCode: string): Food {
    const product = apiFood.product;
    const nutriments = product.nutriments;
    const foodName = this.getFoodName(apiFood, locale, barCode);
    return new Food(
      foodName,
      nutriments.proteins_100g,
      nutriments.carbohydrates_100g,
      nutriments.fat_100g
    );
  }

  // *  get name from api, if not found, return barcode
  public getFoodName(apiFood: OpenFoodFactApiResponse, locale: string, barCode: string): string {
    console.log("getFoodName", apiFood)
    let name = "";
    const genericTranslatedName = `generic_name_${locale}` as keyof OpenFoodFactApiProduct;
    console.group()
    console.log("genericTranslatedName", genericTranslatedName);
    name = apiFood.product[genericTranslatedName] as string;
    console.log("name", name);
    console.groupEnd()
    if (this.nameIsNullOrWhiteSpace(name)) {
      name = apiFood.product.generic_name;
      if (this.nameIsNullOrWhiteSpace(name)) {
        console.group()
        const productTranslatedName = `product_name_${locale}` as keyof OpenFoodFactApiProduct;
        console.log("productTranslatedName", productTranslatedName);
        name = apiFood.product[productTranslatedName] as string;
        console.log("name", name);
        console.groupEnd()
        if (this.nameIsNullOrWhiteSpace(name)) {
          name = apiFood.product.product_name as string;
          if (this.nameIsNullOrWhiteSpace(name)) {
            name = barCode;
          }
        }
      }
    }
    return name;
  }

  public nameIsNullOrWhiteSpace(name: string): boolean {
    return name == null || name.trim() === '';
  }
}
