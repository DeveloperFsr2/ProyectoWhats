import logo from './logo.svg';
import './App.css';
import React from 'react';
import QRCodeComponent from './QRCodeComponent';

function App() {
  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <QRCodeComponent /> {/* Aquí llamas al componente QRCodeComponent */}
    </div>
  );
}

export default App;