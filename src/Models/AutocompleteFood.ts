// * use for autocomplete, represent api retrived food or recipe
export default class AvalaibleIngredient {
    constructor(
        public id: string,
        public name: string,
        public proteinPer100g: number,
        public carbohydratePer100g: number,
        public lipidPer100g: number,

    ) { }
}