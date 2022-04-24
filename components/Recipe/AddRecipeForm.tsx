import * as React from "react";
import { useTranslation } from "next-i18next";
import Recipe from "../../Models/Recipe";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import Food from "../../Models/Food";
import { FoodsActionType, FoodsReducer } from "../../state/Food/FoodsState";
import FoodsTable from "../Food/FoodsTable";

const AddRecipeForm = () => {
  const { t } = useTranslation();
  const [currentRecipe, setRecipe] = React.useState<Recipe>(new Recipe());
  const [currentFoods, dispatch] = React.useReducer(FoodsReducer, []);

  const handleAdd = (newFood: Food) => {
    dispatch({ type: FoodsActionType.ADD, newFood });
  };

  const handleDelete = (index: number) => {
    dispatch({ type: FoodsActionType.REMOVE, index });
  };

  const handleNameChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    console.log("handleNameChange", currentRecipe);
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
    const savedRecipe = { ...currentRecipe, foods: [...currentFoods] };
    console.log("save recipe", savedRecipe);
  };

  return (
    <form onSubmit={handleSubmit(saveRecipe)}>
      <h1>{t("recipe.add")}</h1>
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
      <FoodsTable
        foods={currentFoods}
        deleteFood={handleDelete}
        onAddFood={handleAdd}
      />
      <Button variant="contained" color="success" type="submit">
        {t("actions.add")}
      </Button>
    </form>
  );
};
export default AddRecipeForm;
