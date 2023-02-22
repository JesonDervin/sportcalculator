export default class FoodHelper {
    static calculateCalories(protein: number, carbohydrate: number, lipid: number): number {
        return Number((protein * 4 + carbohydrate * 4 + lipid * 9).toFixed(2));
    }

    // * Calculate a value(prot,carbs,fat) per 100 grams
    static calculatePer100gram(value: number, quantity: number): number {
        if (value < 0) {
            throw "invalid value";
        }
        if (quantity < 0) {
            return 0;
        }
        const result = (value / 100) * quantity;
        return Number(result.toFixed(2));
    }
}