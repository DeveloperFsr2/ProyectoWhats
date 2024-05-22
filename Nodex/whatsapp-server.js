/*
//--version 1----
// Importa los módulos necesarios
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qr = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega la importación de CORS

// Crea una instancia de Express
const app = express();

// Configura el middleware body-parser
app.use(bodyParser.json());
app.use(cors()); // Agrega la configuración de CORS aquí

// Crea una instancia de WhatsApp Client con la estrategia de autenticación local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' }
});

// Escucha el evento 'authenticated'
client.on('authenticated', () => {
    console.log('Client has been authenticated!');
});

// Escucha el evento 'auth_failure'
client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

// Escucha el evento 'ready'
client.on('ready', () => {
    console.log('Client is ready and connected to WhatsApp!');
});

// Escucha el evento 'qr' para obtener el QR actualizado
client.once('qr', qrCode => {
    console.log('QR RECEIVED', qrCode);
});

// Inicializa la sesión de WhatsApp
client.initialize();

// Define un punto final (endpoint) para enviar mensajes de WhatsApp
app.post('/send-message', (req, res) => {
    const { phoneNumber, message } = req.body;

    // Envía el mensaje utilizando whatsapp-web.js
    client.sendMessage(phoneNumber, message)
        .then(() => {
            res.send('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.status(500).send('Failed to send message');
        });
});

// Define un punto final (endpoint) para generar y obtener el código QR
app.get('/qr-code', (req, res) => {
    // Genera el código QR y lo envía como respuesta
    client.once('qr', qrCode => {
        qr.toDataURL(qrCode, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err);
                res.status(500).send('Failed to generate QR code');
            } else {
                res.send(url);
            }
        });
    });
});
// Inicializa el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log({PORT});
});
*/
////---------------------------------------------------------------
////version 2------------------------------------------------------------
// Importa los módulos necesarios
/*const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qr = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega la importación de CORS

// Crea una instancia de Express
const app = express();

// Configura el middleware body-parser
app.use(bodyParser.json());
app.use(cors()); // Agrega la configuración de CORS aquí

// Crea una instancia de WhatsApp Client con la estrategia de autenticación local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' }
});

let qrCode = null;

// Escucha el evento 'authenticated'
client.on('authenticated', () => {
    console.log('Client has been authenticated!');
});

// Escucha el evento 'auth_failure'
client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

// Escucha el evento 'ready'
client.on('ready', () => {
    console.log('Client is ready and connected to WhatsApp!');
});

// Escucha el evento 'qr' para obtener el QR actualizado
client.on('qr', code => {
    qrCode = code;
    console.log('QR RECEIVED', code);
});

// Inicializa la sesión de WhatsApp
client.initialize();

// Define un punto final (endpoint) para enviar mensajes de WhatsApp
app.post('/send-message', (req, res) => {
    const { phoneNumber, message } = req.body;

    // Envía el mensaje utilizando whatsapp-web.js
    client.sendMessage(phoneNumber, message)
        .then(() => {
            res.send('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.status(500).send('Failed to send message');
        });
});

// Define un punto final (endpoint) para obtener el código QR
app.get('/qr-code', (req, res) => {
    if (qrCode) {
        qr.toDataURL(qrCode, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err);
                res.status(500).send('Failed to generate QR code');
            } else {
                res.send(url);
            }
        });
    } else {
        res.status(404).send('QR code not available yet');
    }
});

// Inicializa el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/
////Version 3 -------------------------------------------------------------------------------------
// Importa los módulos necesarios
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qr = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega la importación de CORS

// Crea una instancia de Express
const app = express();

// Configura el middleware body-parser
app.use(bodyParser.json());
app.use(cors()); // Agrega la configuración de CORS aquí

// Crea una instancia de WhatsApp Client con la estrategia de autenticación local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' }
});

let qrCode = null;

// Escucha el evento 'authenticated'
client.on('authenticated', () => {
    console.log('Client has been authenticated!');
});

// Escucha el evento 'auth_failure'
client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

// Escucha el evento 'ready'
client.on('ready', () => {
    console.log('Client is ready and connected to WhatsApp!');
});

// Escucha el evento 'qr' para obtener el QR actualizado
client.on('qr', code => {
    qrCode = code;
    console.log('QR RECEIVED', code);
});

// Inicializa la sesión de WhatsApp
client.initialize();

// Define un punto final (endpoint) para enviar mensajes de WhatsApp
app.post('/send-message', (req, res) => {
    const { phoneNumber, message } = req.body;

    // Envía el mensaje utilizando whatsapp-web.js
    client.sendMessage(phoneNumber, message)
        .then(() => {
            res.send('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.status(500).send('Failed to send message');
        });
});

// Define un punto final (endpoint) para obtener el código QR
app.get('/qr-code', (req, res) => {
    if (qrCode) {
        qr.toDataURL(qrCode, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err);
                res.status(500).send('Failed to generate QR code');
            } else {
                res.send(url);
            }
        });
    } else {
        res.status(404).send('QR code not available yet');
    }
});

// Define un punto final (endpoint) para obtener el estado del código QR
app.get('/qr-status', (req, res) => {
    // Envia una respuesta indicando que el código QR está listo
    res.send('ready');
});

// Inicializa el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js ejecutándose en el puerto ${PORT}`);
});
