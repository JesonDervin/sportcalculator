import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Meal from "../../Models/Meal";
import FoodHelper from "../../Models/Helpers/FoodHelper";
import Food from "../../Models/Food";

interface MealTableProps {
  meal: Meal;
}

export default function MealTable(props: MealTableProps) {
  const { meal } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label={meal.type}>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={12}>
              {meal.type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Quantity (g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meal.foods.map((food: Food) => (
            <TableRow
              key={food.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {food.name}
              </TableCell>
              <TableCell align="right">{food.quantity}</TableCell>
              <TableCell align="right">{food.protein}</TableCell>
              <TableCell align="right">{food.carbohydrate}</TableCell>
              <TableCell align="right">{food.lipid}</TableCell>
              <TableCell align="right">
                {FoodHelper.calculateCalories(
                  food.protein,
                  food.carbohydrate,
                  food.lipid
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
