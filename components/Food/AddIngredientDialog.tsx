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
import AvalaibleIngredient from "../../src/Models/AutocompleteFood";
import FoodHelper from "../../src/Helpers/FoodHelper";
import { avalaibleIngredientsState } from "../../src/State/Food/AvalaibleIngredientsState";
import { ToastContainer, toast } from "material-react-toastify";
import 'material-react-toastify/dist/ReactToastify.min.css';
interface FoodDialogProps {
  onAddFood: (newFood: Food) => void;
}

export default function FoodDialog(props: FoodDialogProps) {
  const { onAddFood } = props;
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const avalaibleIngredientsStored = useRecoilValue(avalaibleIngredientsState(i18n.language));
  const [avalaibleIngredients, setAvalaibleIngredients] = React.useState([] as AvalaibleIngredient[]);
  const [currentAvalaibleIngredient, setCurrentAvalaibleIngredient] = React.useState<AvalaibleIngredient>();
  const [currentIngredient, setCurrentIngredient] = React.useState<Food>(
    new Food()
  );
  React.useEffect(() => {
    setAvalaibleIngredients(avalaibleIngredientsStored);
  }, [avalaibleIngredientsStored])

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
      [e.currentTarget.name]: Number(e.currentTarget.value),
    } as Food);
  };

  const handleQuantity = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newQuantity = + Math.round(Number(e.currentTarget.value));
    const newFood = {
      ...currentIngredient,
      quantity: newQuantity,
    } as Food;
    if (currentAvalaibleIngredient) {
      newFood.protein = FoodHelper.calculatePer100gram(currentAvalaibleIngredient.proteinPer100g, newQuantity);
      newFood.carbohydrate = FoodHelper.calculatePer100gram(currentAvalaibleIngredient.carbohydratePer100g, newQuantity);
      newFood.lipid = FoodHelper.calculatePer100gram(currentAvalaibleIngredient.lipidPer100g, newQuantity);

    }
    setCurrentIngredient(newFood);
  };

  // * form constraints for number
  const numberConstraints = { required: true, onChange: handleFood, min: 0 };
  // * form constraints for ingredient name
  const nameConstraints = { required: true, minLength: 2 };


  const update = (
    event: React.SyntheticEvent<Element, Event>,
    value: Recipe | string | null
  ) => {
    let foodToSet = new Food();
    if (value !== null && typeof value === "string") {
      const stored = avalaibleIngredients.find((food) => food.id === value);
      if (stored) {
        setCurrentAvalaibleIngredient(stored);
        foodToSet = new Food(
          stored.name,
          stored.proteinPer100g,
          stored.carbohydratePer100g,
          stored.lipidPer100g
        );
      } else {
        setCurrentAvalaibleIngredient(undefined);
        foodToSet = {
          ...currentIngredient,
          name: value,
        } as Food;
      }
    }
    setCurrentIngredient(foodToSet);
  };

  const openFoodFactService = new OpenFoodFactService();
  const handleBarCodeSave = async (newBarCode: string) => {
    try {
      const retrievedFood = await openFoodFactService.getFoodInformation(
        newBarCode, i18n.language
      );
      setCurrentAvalaibleIngredient(new AvalaibleIngredient("", retrievedFood.name, retrievedFood.protein, retrievedFood.carbohydrate, retrievedFood.lipid))
      setCurrentIngredient(retrievedFood);
    } catch (error: unknown) {
      toast.error(t('errors.foodNotFound'), {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }
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
      <Dialog open={open} onClose={handleClose} scroll={"paper"}>
        <DialogTitle>
          {t("ingredient.add")}
          <CameraScannerDialog onBarCodeSave={handleBarCodeSave} />
        </DialogTitle>
        <div>
          <DialogContent>
            <Grid container direction="column">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    onInputChange={update}
                    freeSolo={true}
                    disablePortal
                    options={avalaibleIngredientsStored}
                    groupBy={(option) => option.isRecipe ? t("recipe.my") : t("other")}
                    inputValue={currentIngredient.name}
                    getOptionLabel={(option) => option.id}
                    filterOptions={(options, state) => options.filter(o => {
                      // * filter what is on popup
                      // * render only what is contained in query, max 5
                      // * minimal query length is 2
                      if (state.inputValue.length < 2) {
                        return false;
                      } else {
                        return o.name.toLocaleLowerCase().includes(state.inputValue.toLocaleLowerCase());
                      }
                    }).splice(0, 5)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={errors.name ? true : false}
                        helperText={errors.name ? t("errors.invalid") : ""}
                        label={t("ingredient.name")}
                        value={currentIngredient.name}
                        {...register("name", nameConstraints)}
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.name}
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
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
          <ToastContainer />
        </div>
      </Dialog>
    </div>
  );
}
