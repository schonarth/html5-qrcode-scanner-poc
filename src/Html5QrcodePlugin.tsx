/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
  Html5QrcodeScanType,
} from 'html5-qrcode';

const qrcodeRegionId = 'html5qr-code-full-region';

interface PropsInterface {
  fps?: number;
  qrbox?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  aspectRatio?: number;
  supportedScanTypes?: Html5QrcodeScanType[];
  qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

function noop() {}

function Html5QrcodePlugin(props: PropsInterface) {
  let html5QrcodeScanner: Html5QrcodeScanner;
  const ref = React.useRef(null);

  function clearScanner() {
    if (html5QrcodeScanner) {
      console.log('Clearing scanner');

      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    }
  }

  useEffect(() => {
    if (!ref.current) return;
    clearScanner();

    html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      createConfig(),
      !!props.verbose
    );
    console.log('Starting scanner');
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback || noop
    );

    return clearScanner;
  }, [ref.current]);

  return (
    <>
      <div
        id={qrcodeRegionId}
        ref={ref}
        // className="position-absolute start-0 overflow-hidden w-auto h-100"
      ></div>
    </>
  );

  function createConfig() {
    const config = {
      fps: props.fps || 10,
      qrbox: props.qrbox,
      disableFlip: props.disableFlip || false,
      supportedScanTypes: props.supportedScanTypes || [
        Html5QrcodeScanType.SCAN_TYPE_CAMERA,
        Html5QrcodeScanType.SCAN_TYPE_FILE,
      ],
      aspectRatio: props.aspectRatio || 1,
    };
    return config;
  }
}

export default Html5QrcodePlugin;
export { Html5QrcodeSupportedFormats, Html5QrcodeScanType };
