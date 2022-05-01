export default class Food {
  constructor(
    public name: string = "",
    public quantity: number = 0,
    public protein: number = 0,
    public proteinPer100grams: number = 0,
    public carbohydrate: number = 0,
    public carbohydratePer100grams: number = 0,
    public lipid: number = 0,
    public lipidPer100grams: number = 0
  ) {}
}
