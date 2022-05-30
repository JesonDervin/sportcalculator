import * as React from "react";
import {
  IconButton,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import FoodHelper from "../../src/Helpers/FoodHelper";
import FoodsTableProps from "../../src/Models/FoodsTableProps";
import { useTranslation } from "next-i18next";
import Food from "../../src/Models/Food";
import { Delete } from "@mui/icons-material";
import AddIngredientDialog from "./AddIngredientDialog";
import { Box } from "@mui/system";

const FoodsMobileTable = (props: FoodsTableProps) => {
  const { foods, deleteFood, onAddFood } = props;
  const { t } = useTranslation();
  // use this state has we have rehysratation issue
  // more info https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [currentFoods, setCurrentFoods] = React.useState([] as Food[]);
  React.useEffect(() => {
    setCurrentFoods(foods);
  }, [foods]);

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {currentFoods.length == 0 && <Box component="span">{t("ingredient.empty")}</Box>}
      {currentFoods.map((food: Food, index: number) => (
        <Grid item key={food.name}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    {food.name} {food.quantity}
                    {t("unit.gramShort")}
                  </TableCell>
                  <TableCell>
                    {FoodHelper.calculateCalories(
                      food.protein,
                      food.carbohydrate,
                      food.lipid
                    )}
                    {t("caloriesShort")}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteFood(index)}>
                      <Delete aria-label="delete" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t("protein")}&nbsp;{food.protein}
                    {t("unit.gramShort")}
                  </TableCell>
                  <TableCell>
                    {t("carbs")}&nbsp;{food.carbohydrate}
                    {t("unit.gramShort")}
                  </TableCell>
                  <TableCell>
                    {t("fat")}&nbsp;{food.lipid}
                    {t("unit.gramShort")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ))}
      <Grid item>
        <AddIngredientDialog onAddFood={onAddFood} />
      </Grid>
    </Grid>
  );
};

export default FoodsMobileTable;
