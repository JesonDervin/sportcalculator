import * as React from "react";
import { useTranslation } from "next-i18next";
import Recipe from "../../src/Models/Recipe";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";
import Food from "../../src/Models/Food";
import { FoodsActionType, FoodsReducer } from "../../src/State/Food/FoodsState";
import FoodsTable from "../Food/FoodsTable";
import LocalStorageKeys from "../../src/Models/LocalStorageKeys";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const AddRecipeForm = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const [currentRecipe, setRecipe] = React.useState<Recipe>(new Recipe());
  const [currentFoods, dispatch] = React.useReducer(FoodsReducer, []);
  const [storedRecipes, setStoredRecipes] = useLocalStorage<Recipe[]>(
    LocalStorageKeys.Recipes,
    []
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
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Recipe>({ criteriaMode: "all" });

  const saveRecipe: SubmitHandler<Recipe> = () => {
    const savedRecipe = {
      ...currentRecipe,
      foods: [...currentFoods],
      id: uuidv4(),
    } as Recipe;
    setStoredRecipes([...storedRecipes, savedRecipe]);
    router.push("/Recipes");
  };

  return (
    <form onSubmit={handleSubmit(saveRecipe)}>
      <Grid container spacing={2}>
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
        <Grid item xs={12}>
          <div>
            <FoodsTable
              foods={currentFoods}
              deleteFood={handleDelete}
              onAddFood={handleAdd}
            />
          </div>
        </Grid>
        <Grid item alignContent="flex-end">
          <Button variant="contained" color="success" type="submit">
            {t("actions.add")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default AddRecipeForm;
