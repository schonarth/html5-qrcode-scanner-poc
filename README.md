# HTML5 QR Code Scanner POC

This POC demonstrates how to open a scanner, read a QR code, extract information from it, and decide what to do with that information. It's React, web-based, using your computer's webcam, both your smartphone's front and cameras, and even via file upload if that's what you got.

## Sibling projects

* This POC is the web version of the [React Native QR code scanner POC](https://github.com/schonarth/react-native-qrcode-scanner-poc) I built to do the same thing on a native mobile app.

* Also, go to https://schonarth.github.io/react-qrcode-deep-link to generate *deferred deep link* QR codes that send users to the app if read from a regular mobile camera app. Scanning those with this app extracts the parameters so you can stay in-app.

## Installing

Check out this repository into a folder and run ```yarn``` or ```npm install``` to install the dependencies, then either ```yarn run start``` or ```npm run start```, depending on your flavor.

The app functionality is self-explained in the ```src/App.tsx``` and ```src/Html5QrcodePlugin.tsx``` files.

## Using

Once the app is running on your browser:

* Toggle the **Scanner ON** switch to begin
  * To scan an image file, click the **Stop Scanning** within the scanner UI, then the **Scan an Image File** link.
* The scanner supports several different formats:
  * 1D barcode (several standards)
  * QR code and other 2D formats
  * If the code contains a URL, you can use it to start navigation.
  * [Deferred deep link](https://schonarth.github.io/react-qrcode-deep-link) codes contain an URL that behave according to the scenario:
    * When scanned with a smartphone camera app, it will either
      * Open the app if installed, passing included parameters, or
      * Send users to either App Store or Google Play Store, depending on their device, to install the app.
    * When scanned with this app, included parameters can be extracted and used immediately, no need to navigate away.

## Known issue

The scanner component intermitently displays the camera view twice. This is the (very) quick-and-easy implementation, though; using the API to skip the provided UI should avoid the issue.