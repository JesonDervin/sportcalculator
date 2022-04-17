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
import { FoodAction, FoodActionType } from "../../state/Food/FoodListState";

interface FoodDialogProps {
  handleAdd: (newFood: Food) => void;
}

export default function FoodDialog(props: FoodDialogProps) {
  const { handleAdd } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setCurrentIngredient(new Food());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currentIngredient, setCurrentIngredient] = React.useState<Food>(
    new Food()
  );
  const saveIngredient = (e: React.FormEvent) => {
    e.preventDefault();
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
        <form onSubmit={(e) => saveIngredient(e)}>
          <DialogContent>
            <Grid container direction="column">
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    label="Name"
                    name="name"
                    type="search"
                    value={currentIngredient.name}
                    onChange={handleFood}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={currentIngredient.quantity}
                    onChange={handleFood}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h3>NutritionalDetails</h3>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="protein"
                    label="Protein"
                    type="number"
                    value={currentIngredient.protein}
                    onChange={handleFood}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="carbohydrate"
                    label="Carbohydrate"
                    type="number"
                    value={currentIngredient.carbohydrate}
                    onChange={handleFood}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="lipid"
                    label="Lipid"
                    type="number"
                    value={currentIngredient.lipid}
                    onChange={handleFood}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
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
