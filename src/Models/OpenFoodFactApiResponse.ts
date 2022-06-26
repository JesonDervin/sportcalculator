export interface OpenFoodFactApiResponse {
  code: string;
  product: OpenFoodFactApiProduct;
}
export interface OpenFoodFactApiProduct {
  product_name: string;
  product_name_en: string;
  product_name_fr: string;
  generic_name: string;
  generic_name_en: string;
  generic_name_fr: string;

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
