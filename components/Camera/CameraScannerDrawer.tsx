import * as React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box, Button, Drawer } from "@mui/material";
import CameraBarCodeScanner from "./CameraBarCodeScanner";
const CameraScannerDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const [barCode, setBarCode] = React.useState("");

  const handleBarCodeDetected = (newBarCode: string) => {
    // setOpen(false);
    setBarCode(newBarCode);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<CameraAltIcon />}
        onClick={() => setOpen(true)}
      >
        SCANINGREDIENT
      </Button>
      Barcode : {barCode}
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ maxHeight: "400px" }} role="presentation">
          {open && (
            <CameraBarCodeScanner OnBarcodeDetected={handleBarCodeDetected} />
          )}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};
export default CameraScannerDrawer;
