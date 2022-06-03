import axios from "axios";
import Food from "../Models/Food";
import { OpenFoodFactApiResponse } from "../Models/OpenFoodFactApiResponse";

export default class OpenFoodFactService {
  private OpenFoodFactBaseUrl = "https://world.openfoodfacts.org";
  private OpenFoodFactApiUrlTemplate = `${this.OpenFoodFactBaseUrl}/api/v0/product/[barcode].json`;
  private replaceInTemplate = "[barcode]";

  public async getFoodInformation(barCode: string): Promise<Food> {
    const url = this.OpenFoodFactApiUrlTemplate.replace(
      this.replaceInTemplate,
      barCode
    );
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
      product.generic_name,
      nutriments.proteins_100g,
      nutriments.carbohydrates_100g,
      nutriments.fat_100g
    );
  }
}
