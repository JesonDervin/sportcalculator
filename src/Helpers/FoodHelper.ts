export default class FoodHelper{
    static calculateCalories(protein:number,carbohydrate:number,lipid:number):number{
        return protein * 4 + carbohydrate * 4 + lipid * 9;
    }
}