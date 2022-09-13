import React, { useState } from 'react';
import './App.css';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const APP_URL = 'schonarth.github.io';
  const DEEP_LINK_URL = 'https://schonarth.github.io/react-qrcode-deep-link';
  const [qrCode, setQrCode] = useState<string | undefined>(undefined);
  const [scannerOn, setScannerOn] = useState(false);

  /**
   * This is the parameter extracted from the QR code.
   * When scanned from the app, you can skip visiting the website
   * and go straight to the action it's supposed to initiate.
   * When scanned from the website, you will be redirected to the app.
   * This example contains one parameter; you can have as many as you want.
   */
  const [qrCodeQuery, setQrCodeQuery] = useState<string | undefined>(undefined);

  const isUrl = () => {
    return !!qrCode && qrCode.startsWith('http');
  };

  function handleScan(decodedText: any) {
    setQrCode(decodedText);
    toggleScanner();
    setQrCodeQuery(processQR(decodedText));
  }

  function toggleScanner() {
    setScannerOn(!scannerOn);
  }

  /**
   * This function processes the QR code data and extracts the app parameter(s).
   * It only works if the QR code contains the app URL (other checks can be added).
   */
  const processQR = (qrCode: string): string | undefined =>
    (qrCode?.includes(APP_URL) &&
      new URLSearchParams(qrCode.substring(qrCode.indexOf('?'))).get(
        'query'
      )) ||
    undefined;

  return (
    <div className="App container">
      <div className="row mt-3">
        <div className="col">
          <Form>
            <Form.Switch
              id="scannerToggle"
              onChange={toggleScanner}
              label={`Scanner ${scannerOn ? 'ON' : 'OFF'}`}
              checked={scannerOn}
            />
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="col camera-container position-relative">
          {(scannerOn && (
            <Html5QrcodePlugin
              fps={10}
              disableFlip={false}
              qrCodeSuccessCallback={handleScan}
            />
          )) || (
            <div className="camera-placeholderz">
              <div className="position-absolute top-50 start-50 translate-middle text-center">
                {!!qrCode ? (
                  <>
                    <pre>
                      {isUrl() ? (
                        <a href={qrCode} target="_blank" rel="noreferrer">
                          {qrCode}
                        </a>
                      ) : (
                        qrCode
                      )}
                    </pre>
                    {qrCodeQuery && <pre>Query: {qrCodeQuery}</pre>}
                  </>
                ) : (
                  <>
                    <p>Turn on the scanner to scan a QR code.</p>
                    <p>
                      <a href={DEEP_LINK_URL} target="_blank" rel="noreferrer">
                        Get actionable QR codes here
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
