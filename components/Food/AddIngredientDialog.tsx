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

interface FoodDialogProps {
  handleAdd: (newFood: Food) => void;
}

export default function FoodDialog(props: FoodDialogProps) {
  const { handleAdd } = props;
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
  const saveIngredient: SubmitHandler<Food> = (data: Food) => {
    handleClose();
    handleAdd(currentIngredient);
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
        <DialogTitle>Add an Ingredient</DialogTitle>
        <form onSubmit={handleSubmit(saveIngredient)} noValidate>
          <DialogContent>
            <Grid container direction="column">
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    error={errors.name ? true : false}
                    helperText={errors.name ? "required" : ""}
                    label="Name"
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
                    helperText={errors.quantity ? "Invalid" : ""}
                    label="Quantity"
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
                    helperText={errors.protein ? "Invalid" : ""}
                    label="Protein"
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
                    helperText={errors.carbohydrate ? "Invalid" : ""}
                    label="Carbohydrate"
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
                    helperText={errors.lipid ? "Invalid" : ""}
                    label="Lipid"
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
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
