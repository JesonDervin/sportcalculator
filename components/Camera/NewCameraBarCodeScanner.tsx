import * as React from "react";
import { Html5Qrcode } from "html5-qrcode"
import { Html5QrcodeError, QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode/esm/core";
import { Html5QrcodeCameraScanConfig } from "html5-qrcode/esm/html5-qrcode";
interface CameraBarCodeScannerProps {
    OnBarcodeDetected: (barcode: string) => void;
}

const NewCameraBarCodeScanner = (props: CameraBarCodeScannerProps) => {
    const { OnBarcodeDetected } = props;

    const config = { fps: 10, qrbox: { width: 250, height: 250 } } as Html5QrcodeCameraScanConfig;
    React.useEffect(() => {
        let html5QrCode = new Html5Qrcode("reader");
        const barCodeSuccessCallback: QrcodeSuccessCallback = (decodedText, decodedResult) => {
            // todo exploit decodedResult to filter format
            OnBarcodeDetected(decodedText);
        };

        const barCodeErrorCallback: QrcodeErrorCallback = (errorMessage: string, error: Html5QrcodeError) => {
            // todo: show error
        }
        // prefer back camera
        html5QrCode.start({ facingMode: "environment" }, config, barCodeSuccessCallback, barCodeErrorCallback);
    });


    return (<div id="reader"></div>)
};

export default NewCameraBarCodeScanner;