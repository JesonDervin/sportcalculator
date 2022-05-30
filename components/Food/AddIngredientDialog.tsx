import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import Food from "../../src/Models/Food";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Recipe from "../../src/Models/Recipe";
import CameraScannerDialog from "../Camera/CameraScannerDialog";
import OpenFoodFactService from "../../src/Services/OpenFoodFactService";
import { useRecoilValue } from "recoil";
import { recipesMealState } from "../../src/State/Recipes";
import { getFoodsForAutocomplete } from "../../src/Services/CiqualService";
import AutocompleteFood from "../../src/Models/AutocompleteFood";
import FoodHelper from "../../src/Helpers/FoodHelper";

interface FoodDialogProps {
  onAddFood: (newFood: Food) => void;
}

export default function FoodDialog(props: FoodDialogProps) {
  const { onAddFood } = props;
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const autocompleteFoods = getFoodsForAutocomplete(i18n.language);
  const storedRecipes = useRecoilValue(recipesMealState);
  const [currentIngredient, setCurrentIngredient] = React.useState<Food>(
    new Food()
  );
  React.useEffect(() => {
    const convertRecipesToAutocomplete = storedRecipes.map(r => new AutocompleteFood(r.id, r.name, r.proteinPerQuantity(), r.carbohydratePerQuantity(), r.lipidPerQuantity()));
    autocompleteFoods.concat(convertRecipesToAutocomplete);
  }, [storedRecipes, autocompleteFoods])

  const handleClickOpen = () => {
    reset();
    setCurrentIngredient(new Food());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Food>({ criteriaMode: "all" });


  const saveIngredient: SubmitHandler<Food> = () => {
    handleClose();
    onAddFood(currentIngredient);
  };

  const handleFood = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCurrentIngredient({
      ...currentIngredient,
      [e.currentTarget.name]: e.currentTarget.value,
    } as Food);
  };

  const handleQuantity = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newQuantity = +e.currentTarget.value;
    const newFood = {
      ...currentIngredient,
      quantity: newQuantity,
    } as Food;
    newFood.protein = FoodHelper.calculatePer100gram(currentIngredient.protein, newQuantity);
    newFood.carbohydrate = FoodHelper.calculatePer100gram(currentIngredient.carbohydrate, newQuantity);
    newFood.lipid = FoodHelper.calculatePer100gram(currentIngredient.lipid, newQuantity);
    setCurrentIngredient(newFood);
  };

  const numberConstraints = { required: true, onChange: handleFood, min: 0 };


  const update = (
    event: React.SyntheticEvent<Element, Event>,
    value: Recipe | string | null
  ) => {
    let foodToSet = new Food();
    if (value !== null && typeof value === "string") {
      console.log("value ", value)
      const stored = autocompleteFoods.find((food) => food.id === value);
      console.log("stored ", stored)
      if (stored) {
        foodToSet = new Food(
          stored.name,
          stored.proteinPer100g,
          stored.carbohydratePer100g,
          stored.lipidPer100g
        );
      } else {
        foodToSet = {
          ...currentIngredient,
          name: value,
        } as Food;
      }
    }
    console.log("foodToSet", foodToSet);
    setCurrentIngredient(foodToSet);
  };

  const openFoodFactService = new OpenFoodFactService();
  const handleBarCodeSave = async (newBarCode: string) => {
    const retrievedFood = await openFoodFactService.getFoodInformation(
      newBarCode
    );
    setCurrentIngredient(retrievedFood);
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="add ingredient"
        component="span"
        onClick={handleClickOpen}
        size="large"
      >
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t("ingredient.add")}
          <CameraScannerDialog onBarCodeSave={handleBarCodeSave} />
        </DialogTitle>
        <div>
          <DialogContent>
            <Grid container direction="column">
              <Grid container spacing={2}>
                <Grid item xs>
                  <Autocomplete
                    onInputChange={update}
                    freeSolo={true}
                    disablePortal
                    options={autocompleteFoods}
                    inputValue={currentIngredient.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={errors.name ? true : false}
                        helperText={errors.name ? t("errors.required") : ""}
                        label={t("ingredient.name")}
                        value={currentIngredient.name}
                        {...register("name", {
                          required: true,
                        })}
                      />
                    )}
                    getOptionLabel={(option) => option.id}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.name}
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    error={errors.quantity ? true : false}
                    helperText={errors.quantity ? t("errors.invalid") : ""}
                    label={t("quantity")}
                    value={currentIngredient.quantity}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                    {...register("quantity", {
                      required: true,
                      onChange: handleQuantity,
                      min: 0,
                    })}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h3>NutritionalDetails</h3>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={errors.protein ? true : false}
                    helperText={errors.protein ? t("errors.invalid") : ""}
                    label={t("protein")}
                    type="number"
                    value={currentIngredient.protein}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                    {...register("protein", numberConstraints)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={errors.carbohydrate ? true : false}
                    helperText={errors.carbohydrate ? t("errors.invalid") : ""}
                    label={t("carbohydrate")}
                    type="number"
                    value={currentIngredient.carbohydrate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                    {...register("carbohydrate", numberConstraints)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={errors.lipid ? true : false}
                    helperText={errors.lipid ? t("errors.invalid") : ""}
                    label={t("lipid")}
                    type="number"
                    value={currentIngredient.lipid}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                    {...register("lipid", numberConstraints)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              {t("actions.cancel")}
            </Button>
            <Button color="primary" onClick={handleSubmit(saveIngredient)}>
              {t("actions.confirm")}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
