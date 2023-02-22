import Food from "./Food";

export default interface FoodsTableProps {
  foods: Food[];
  deleteFood: (index: number) => void;
  onAddFood: (newFood: Food) => void;
}
