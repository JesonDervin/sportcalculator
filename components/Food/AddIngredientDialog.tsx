import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import Food from "../../Models/Food";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface FoodDialogProps {
  onAddFood: (newFood: Food) => void;
}

export default function FoodDialog(props: FoodDialogProps) {
  const { onAddFood } = props;
  const [open, setOpen] = React.useState(false);
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

  const [currentIngredient, setCurrentIngredient] = React.useState<Food>(
    new Food()
  );
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
    });
  };

  const numberConstraints = { required: true, onChange: handleFood, min: 0 };

  const { t } = useTranslation();

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
        <DialogTitle>{t("ingredient.add")}</DialogTitle>
        <form onSubmit={handleSubmit(saveIngredient)} noValidate>
          <DialogContent>
            <Grid container direction="column">
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    error={errors.name ? true : false}
                    helperText={errors.name ? t("errors.required") : ""}
                    label={t("ingredient.name")}
                    type="search"
                    value={currentIngredient.name}
                    {...register("name", {
                      required: true,
                      onChange: handleFood,
                    })}
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
                      onChange: handleFood,
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
            <Button color="primary" type="submit">
              {t("actions.confirm")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
