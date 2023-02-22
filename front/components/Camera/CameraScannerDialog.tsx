import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  Toolbar,
} from "@mui/material";
import CameraBarCodeScanner from "./NewCameraBarCodeScanner";
import { useTranslation } from "next-i18next";
import { TransitionProps } from "@mui/material/transitions";
import QrCode2Icon from "@mui/icons-material/QrCode2";
interface CameraScannerDialogProps {
  onBarCodeSave: (newBarCode: string) => void;
}

const CameraScannerDialog = (props: CameraScannerDialogProps) => {
  const { onBarCodeSave } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = React.useState("");
  const [cameraDevices, setCameraDevices] = React.useState([] as MediaDeviceInfo[]);
  React.useEffect(() => {
    const getCameraDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameraDevices = devices.filter(s => s.kind === "videoinput")
      setCameraDevices(cameraDevices);
      setSelectedDeviceId(cameraDevices[0].deviceId)
    }
    getCameraDevices().catch(console.error);
  }, []);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedDeviceId(event.target.value);
  };

  const handleBarCodeDetected = (newBarCode: string) => {
    onBarCodeSave(newBarCode);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Button
        size="small"
        startIcon={<QrCode2Icon />}
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
            {/* todo: have a better color */}
            <FormControl variant="standard" color="error">
              <Select
                value={selectedDeviceId}
                onChange={handleSelectChange}
              >
                {cameraDevices.map((device: MediaDeviceInfo) => (
                  <MenuItem key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>

        <CameraBarCodeScanner OnBarcodeDetected={handleBarCodeDetected} cameraDeviceId={selectedDeviceId} />
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
