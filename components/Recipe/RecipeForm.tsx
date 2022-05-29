import * as React from "react";
import { useTranslation } from "next-i18next";
import Recipe from "../../src/Models/Recipe";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";
import Food from "../../src/Models/Food";
import { FoodsActionType, FoodsReducer } from "../../src/State/Food/FoodsState";
import FoodsTable from "../Food/FoodsTable";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { recipeStateById } from "../../src/State/Recipes";
import FoodsMobileTable from "../Food/FoodsMobileTable";

interface RecipeFormProps {
  recipeToEditId?: string;
}

const RecipeForm = (props: RecipeFormProps) => {
  const { recipeToEditId } = props;
  const isEdit = typeof recipeToEditId !== typeof undefined;
  const router = useRouter();
  const [storedRecipe, setStoredRecipes] = useRecoilState(
    recipeStateById(recipeToEditId as string)
  );

  const { t } = useTranslation();
  const [currentRecipe, setRecipe] = React.useState<Recipe>(new Recipe());

  const [currentFoods, dispatch] = React.useReducer(
    FoodsReducer,
    currentRecipe.foods
  );

  const handleAdd = (newFood: Food) => {
    dispatch({ type: FoodsActionType.ADD, newFood });
  };

  const handleDelete = (index: number) => {
    dispatch({ type: FoodsActionType.REMOVE, index });
  };

  const handleNameChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRecipe({
      ...currentRecipe,
      [e.currentTarget.name]: e.currentTarget.value,
    } as Recipe);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Recipe>({ criteriaMode: "all", defaultValues: currentRecipe });

  const saveRecipe: SubmitHandler<Recipe> = () => {
    const savedRecipe = {
      ...currentRecipe,
      foods: [...currentFoods],
    } as Recipe;
    setStoredRecipes(savedRecipe);
    router.push("/Recipes");
  };

  const editRecipe: SubmitHandler<Recipe> = () => {
    const recipeEdited = {
      ...currentRecipe,
      foods: [...currentFoods],
    } as Recipe;
    setStoredRecipes(recipeEdited);
    router.push("/Recipes");
  };

  const deleteRecipe = () => {
    setStoredRecipes(undefined);
    router.push("/Recipes");
  };

  React.useEffect(() => {
    if (storedRecipe) {
      setRecipe(storedRecipe);
      dispatch({ type: FoodsActionType.INIT, initFood: storedRecipe.foods });
      reset(storedRecipe);
    }
  }, [reset, storedRecipe]);
  return (
    <form
      onSubmit={isEdit ? handleSubmit(editRecipe) : handleSubmit(saveRecipe)}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            error={errors.name ? true : false}
            helperText={errors.name ? t("errors.required") : ""}
            label={t("ingredient.name")}
            type="search"
            value={currentRecipe.name}
            {...register("name", {
              required: true,
              onChange: handleNameChange,
            })}
          />
        </Grid>
        <Grid item>
          <h2>{t("ingredient.label")}</h2>
        </Grid>
        <Grid item>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <FoodsTable
              foods={currentFoods}
              deleteFood={handleDelete}
              onAddFood={handleAdd}
            />
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <FoodsMobileTable
              foods={currentFoods}
              deleteFood={handleDelete}
              onAddFood={handleAdd}
            ></FoodsMobileTable>
          </Box>
        </Grid>
        <Grid container item xs={12} justifyContent="space-between">
          <Button variant="contained" color="success" type="submit">
            {isEdit ? t("actions.edit") : t("actions.add")}
          </Button>
          <Button variant="contained" color="error" onClick={deleteRecipe}>
            {t("actions.delete")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default RecipeForm;
