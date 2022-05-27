import * as React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CameraBarCodeScanner from "./CameraBarCodeScanner";

interface CameraScannerDialogProps {
  onBarCodeSave: (newBarCode: string) => void;
}

const CameraScannerDialog = (props: CameraScannerDialogProps) => {
  const { onBarCodeSave } = props;
  const [open, setOpen] = React.useState(false);
  const [barCode, setBarCode] = React.useState("");

  const handleBarCodeDetected = (newBarCode: string) => {
    // setOpen(false);
    setBarCode(newBarCode);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    onBarCodeSave(barCode);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<CameraAltIcon />}
        onClick={handleClickOpen}
      >
        SCANINGREDIENT
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Barcode : {barCode}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <CameraBarCodeScanner OnBarcodeDetected={handleBarCodeDetected} />
      </Dialog>
    </React.Fragment>
  );
};
export default CameraScannerDialog;
