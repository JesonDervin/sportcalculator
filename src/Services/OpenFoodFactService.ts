import axios from "axios";
import Food from "../Models/Food";
import { OpenFoodFactApiResponse } from "../Models/OpenFoodFactApiResponse";

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
    const convertedFood = this.mapFoodApiToFood(responseData);
    return convertedFood;
  }

  // Todo: maybe move this part to a mapper
  public mapFoodApiToFood(apiFood: OpenFoodFactApiResponse): Food {
    const product = apiFood.product;
    const nutriments = product.nutriments;
    return new Food(
      product.product_name,
      nutriments.proteins_100g,
      nutriments.carbohydrates_100g,
      nutriments.fat_100g
    );
  }
}
