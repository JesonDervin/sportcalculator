import * as React from "react";
import Food from "../../src/Models/Food";
import FoodsTable from "../Food/FoodsTable";
import { MealType } from "../../src/Models/MealType";
import { Box } from "@mui/material";
import FoodsMobileTable from "../Food/FoodsMobileTable";
import { useRecoilState } from "recoil";
import { todayMealFoodsPerType } from "../../src/State/DailyMeal";
interface DailyTabItemProps {
  mealType: MealType;
}

export default function DailyTabItem(props: DailyTabItemProps) {
  const { mealType } = props;

  const [storedFood, setStoredFoods] = useRecoilState(
    todayMealFoodsPerType(mealType)
  );

  const handleDelete = (index: number) => {
    const newFoods = [...storedFood];
    newFoods.splice(index, 1);
    setStoredFoods(newFoods);
  };

  const handleAdd = (newFood: Food) => {
    const fixedFood = new Food(newFood.name, Number(newFood.protein.toFixed(2)), Number(newFood.carbohydrate.toFixed(2)), Number(newFood.lipid.toFixed(2)), Number(newFood.quantity.toFixed(2)))
    const newFoods = [...storedFood, fixedFood];
    setStoredFoods(newFoods);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <FoodsTable
          foods={storedFood}
          deleteFood={handleDelete}
          onAddFood={handleAdd}
        />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <FoodsMobileTable
          foods={storedFood}
          deleteFood={handleDelete}
          onAddFood={handleAdd}
        ></FoodsMobileTable>
      </Box>
    </React.Fragment>
  );
}
