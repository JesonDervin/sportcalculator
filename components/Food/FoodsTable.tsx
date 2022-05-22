import * as React from "react";
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
import FoodHelper from "../../src/Helpers/FoodHelper";
import Food from "../../src/Models/Food";
import { Delete } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import TotalFood from "../../src/Models/TotalFood";
import AddIngredientDialog from "./AddIngredientDialog";
import FoodsTableProps from "../../src/Models/FoodsTableProps";

export default function FoodsTable(props: FoodsTableProps) {
  const { foods, deleteFood, onAddFood } = props;
  const foodsRef = React.useRef([...foods]);
  React.useEffect(() => {
    foodsRef.current = [...foods];
  }, [foods]);
  const { t } = useTranslation();
  const total = new TotalFood(foods);
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("ingredient.label")}</TableCell>
            <TableCell align="right">
              {t("quantity")}&nbsp;{t("unit.gramShort")}
            </TableCell>
            <TableCell align="right">
              {t("protein")}&nbsp;{t("unit.gramShort")}
            </TableCell>
            <TableCell align="right">
              {t("carbs")}&nbsp;{t("unit.gramShort")}
            </TableCell>
            <TableCell align="right">
              {t("fat")}&nbsp;{t("unit.gramShort")}
            </TableCell>
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
          <TableRow>
            <TableCell scope="row">
              <AddIngredientDialog onAddFood={onAddFood} />
            </TableCell>
          </TableRow>
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
