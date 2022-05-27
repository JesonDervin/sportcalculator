import * as React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CameraBarCodeScanner from "./CameraBarCodeScanner";
import { useTranslation } from "next-i18next";
import { TransitionProps } from "@mui/material/transitions";

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

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Button
        size="small"
        startIcon={<CameraAltIcon />}
        onClick={handleClickOpen}
      >
        {t("scan.label")}
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
              {barCode !== ""
                ? `${t("scan.barcode")}: ${barCode}`
                : t("scan.nobarcode")}
            </Typography>
            {barCode !== "" && (
              <Button autoFocus color="inherit" onClick={handleSave}>
                save
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <CameraBarCodeScanner OnBarcodeDetected={handleBarCodeDetected} />
      </Dialog>
    </React.Fragment>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default CameraScannerDialog;
