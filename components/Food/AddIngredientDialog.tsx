import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function FoodDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogContent>NOTE: FoodForm TO BE INSERTED HERE</DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
