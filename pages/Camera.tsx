import { Container } from "@mui/material";
import CameraScannerDialog from "../components/Camera/CameraScannerDialog";

const Camera = () => {
  return (
    <Container>
      <CameraScannerDialog onBarCodeSave={() => void 0} />
    </Container>
  );
};
export default Camera;
