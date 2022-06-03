export interface OpenFoodFactApiResponse {
  code: string;
  product: OpenFoodFactApiProduct;
}
export interface OpenFoodFactApiProduct {
  product_name: string;
  nutriments: OpenFoodFactApiNutriments;
}
export interface OpenFoodFactApiNutriments {
  carbohydrates_100g: number;
  fat_100g: number;
  proteins_100g: number;
  calcium_100g: number;
  cholesterol_100g: number;
  fiber_100g: number;
}
