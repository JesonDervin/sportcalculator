import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FoodHelper from "../../Models/Helpers/FoodHelper";
import Food from "../../Models/Food";
import { Delete } from "@mui/icons-material";

interface MealTableProps {
  mealFood: Food[];
  deleteFood: (index: number) => void;
}

export default function MealTable(props: MealTableProps) {
  const { mealFood, deleteFood } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Quantity (g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mealFood.map((food: Food, index: number) => (
            <TableRow
              key={food.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{food.name}</TableCell>
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
              <TableCell>
                <IconButton onClick={() => deleteFood(index)}>
                  <Delete aria-label="delete" color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
