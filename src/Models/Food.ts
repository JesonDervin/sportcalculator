export default class Food {
  constructor(
    public name: string = "",
    public protein: number = 0,
    public carbohydrate: number = 0,
    public lipid: number = 0,
    public quantity: number = 100
  ) {}
}
