import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';


const App = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'),
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // Use the back camera if available
            zoom : 2,
          },
        },
        decoder: {
          readers: ['ean_reader', 'upc_reader'] // Specify the type of barcodes to scan
        },
      },
      function (err) {
        if (err) {
          console.error('Quagga error:', err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(detected);
    return () => {
      Quagga.offDetected(detected);
    };
  }, []);

  const detected = (result) => {
    setResult(result.codeResult.code);
    Quagga.start()
    // Process the scanned barcode result as needed
  };

  return (
    <div style={{background: 'red'}}>
      <h1>EAN & UPC Barcode Scanner</h1>
      
      <div id="barcode-scanner" />

      <div>
        {
          setResult !==null ?
          <>
           Scanned code:&nbsp;<span><b>{result}</b></span>
          </>
          :
          <>
           Scanned code:&nbsp;NO RESULT
          </>
        }
       
      </div>
    </div>
  );
};

export default App;

