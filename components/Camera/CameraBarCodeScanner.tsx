import * as React from "react";
import Quagga from "quagga";
interface CameraBarCodeScannerProps {
  OnBarcodeDetected: (barcode: string) => void;
}
const CameraBarCodeScanner = (props: CameraBarCodeScannerProps) => {
  const { OnBarcodeDetected } = props;

  React.useEffect(() => {
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner-container"),
            // constraints: {
            //   width: 450,
            //   height: 300,
            //   facingMode: "environment",
            //   aspectRatio: { min: 1, max: 2 },
            // },
          },
          decoder: {
            readers: [
              //   "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              //   "code_39_reader",
              //   "code_39_vin_reader",
              //   "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              //   "i2of5_reader",
            ],
            debug: false,
            numOfWorkers: navigator.hardwareConcurrency,
          },
        },
        // * quagga does not has typescript
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (err: any) {
          if (err) {
            console.log(err);
            return;
          }

          console.log("Initialization finished. Ready to start");
          Quagga.start();

          // Set flag to is running
          return () => {
            console.log(stop);
            Quagga.stop();
          };
        }
      );
      // * quagga does not has typescript
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Quagga.onProcessed(function (result: any) {
        const drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute("width")),
              parseInt(drawingCanvas.getAttribute("height"))
            );
            result.boxes
              .filter(function (box: never) {
                return box !== result.box;
              })
              .forEach(function (box: never) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: "green",
                  lineWidth: 2,
                });
              });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: "#00F",
              lineWidth: 2,
            });
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: "x", y: "y" },
              drawingCtx,
              { color: "red", lineWidth: 3 }
            );
          }
        }
      });
      // * quagga does not has typescript
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Quagga.onDetected(function (result: any) {
        console.log(
          "Barcode detected and processed : [" + result.codeResult.code + "]",
          result
        );
        OnBarcodeDetected(result.codeResult.code);
      });
    }
  });

  return <div id="scanner-container"></div>;
};
export default CameraBarCodeScanner;
