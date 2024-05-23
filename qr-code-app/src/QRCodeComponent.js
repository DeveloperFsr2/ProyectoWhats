//Version 1

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCodeComponent = () => {
  const [qrCodeData, setQRCodeData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQRCodeData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/qr-code');
        const qrCodeBase64 = response.data;
        setQRCodeData(qrCodeBase64);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching QR code data:', error);
        setError('Failed to fetch QR code');
        setLoading(false);
      }
    };

    fetchQRCodeData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading QR code...</p>
      ) : error ? (
        <p>{error}</p>
      ) : qrCodeData ? (
        <img src={qrCodeData} alt="QR Code" />
      ) : (
        <p>QR code not available</p>
      )}
    </div>
  );
};

export default QRCodeComponent;
*/

//Version 2

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCodeComponent = () => {
  const [qrCodeData, setQRCodeData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQRCodeData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/qr-code');
        const qrCodeBase64 = response.data;
        setQRCodeData(qrCodeBase64);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching QR code data:', error);
        setError('Failed to fetch QR code');
        setLoading(false);
      }
    };

    fetchQRCodeData();
  }, []);

  const sendAuthenticationStatus = async (status) => {
    try {
      // Aquí puedes enviar la información de autenticación al backend de Spring Boot
      await axios.post('http://localhost:8080/whatsapp/authenticated', { authenticationStatus: status });
      console.log('Authentication status sent successfully');
    } catch (error) {
      console.error('Error sending authentication status:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading QR code...</p>
      ) : error ? (
        <p>{error}</p>
      ) : qrCodeData ? (
        <>
          <img src={qrCodeData} alt="QR Code" />
         
        </>
      ) : (
        <p>QR code not available</p>
      )}
    </div>
  );
};

export default QRCodeComponent;

/*
//version 3
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCodeComponent = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  useEffect(() => {
    const fetchQRCodeUrl = async () => {
      try {
        const response = await axios.get('http://localhost:3000/qr-code');
        setQRCodeUrl(response.data.qrCodeUrl);
      } catch (error) {
        console.error('Error fetching QR code URL:', error);
      }
    };

    fetchQRCodeUrl();
  }, []);

  return (
    <div>
      {qrCodeUrl && (
        <img src={qrCodeUrl} alt="QR Code" />
      )}
    </div>
  );
};

export default QRCodeComponent;
*/