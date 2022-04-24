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
import { useTranslation } from "next-i18next";
import TotalFood from "../../Models/TotalMeal";

interface FoodsTableProps {
  foods: Food[];
  deleteFood: (index: number) => void;
}

export default function FoodsTable(props: FoodsTableProps) {
  const { foods, deleteFood } = props;
  const { t } = useTranslation();
  const total = new TotalFood(foods);
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("ingredient.label")}</TableCell>
            <TableCell align="right">{t("quantity")}&nbsp;(g)</TableCell>
            <TableCell align="right">{t("protein")}&nbsp;(g)</TableCell>
            <TableCell align="right">{t("carbs")}&nbsp;(g)</TableCell>
            <TableCell align="right">{t("fat")}&nbsp;(g)</TableCell>
            <TableCell align="right">{t("calories")}</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food: Food, index: number) => (
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
        <TableHead>
          <TableRow
            key={total.calories}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell scope="row">{t("total")}</TableCell>
            <TableCell align="right">{total.quantity}</TableCell>
            <TableCell align="right">{total.protein}</TableCell>
            <TableCell align="right">{total.carbohydrate}</TableCell>
            <TableCell align="right">{total.lipid}</TableCell>
            <TableCell align="right">{total.calories}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
