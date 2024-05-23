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
/*
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
*/
////version 4 

/*const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qr = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' }
});

let qrCode = null;

client.on('authenticated', (session) => {
    console.log('Client has been authenticated!');
    sendTokenToSpringBoot(session); // Llama a una función para enviar el token JWT al backend de Spring Boot
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready and connected to WhatsApp!');
});

client.on('qr', code => {
    qrCode = code;
    console.log('QR RECEIVED', code);
});

client.initialize();

app.post('/send-message', (req, res) => {
    const { phoneNumber, message } = req.body;

    client.sendMessage(phoneNumber, message)
        .then(() => {
            res.send('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.status(500).send('Failed to send message');
        });
});

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

app.get('/qr-status', (req, res) => {
    res.send('ready');
});

// Función para enviar el token JWT al backend de Spring Boot
function sendTokenToSpringBoot(session) {
    const token = jwt.sign({ sessionId: session }, 'finsolred'); // Cambia 'tu_clave_secreta' por tu propia clave secreta

    axios.post('http://localhost:8080/whatsapp/authenticate', { token })
        .then(response => {
            console.log('Token enviado exitosamente a Spring Boot:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar el token a Spring Boot:', error);
        });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js ejecutándose en el puerto ${PORT}`);
});

*/
//version 5
/*
const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'your-secret-key';

let client = null;
let whatsappToken = null;

// Inicializar el cliente de WhatsApp
function initializeWhatsAppClient() {
  client = new Client();
  
  client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      if (err) throw err;
      console.log('QR Code URL:', url);
      // Opcionalmente, envía la URL del código QR a tu aplicación cliente
    });
  });

  client.on('authenticated', (session) => {
    whatsappToken = jwt.sign({ session }, secretKey, { expiresIn: '1h' });
    console.log('Authenticated with token:', whatsappToken);
  });

  client.initialize();
}

initializeWhatsAppClient();

app.use(express.json());

app.get('/whatsapp-token', (req, res) => {
  if (whatsappToken) {
    res.json({ token: whatsappToken });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});


app.post('/send-message', (req, res) => {
  const { token, number, message } = req.body;
  try {
    const decoded = jwt.verify(token, secretKey);
    client.sendMessage(number, message).then(response => {
      res.json({ status: 'success', response });
    }).catch(error => {
      res.status(500).json({ status: 'error', error });
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});
app.get('/qr-code', async (req, res) => {
    try {
      // Generar el código QR con qrcode
      const qrCodeUrl = await qrcode.toDataURL('https://example.com');
  
      // Devolver la URL del código QR
      res.json({ qrCodeUrl });
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
//version 6
/*
const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'your-secret-key';

let client = null;
let qrCodeUrl = null;
let whatsappToken = null;

// Inicializar el cliente de WhatsApp
function initializeWhatsAppClient() {
  client = new Client();
  
  client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      if (err) throw err;
      qrCodeUrl = url; // Almacenar la URL del código QR generado
      console.log('QR Code URL:', qrCodeUrl);
    });
  });

  client.on('authenticated', (session) => {
    whatsappToken = jwt.sign({ session }, secretKey, { expiresIn: '1h' });
    console.log('Authenticated with token:', whatsappToken);
  });

  client.initialize();
}

initializeWhatsAppClient();

app.use(express.json());

// Ruta para obtener el token de WhatsApp
app.get('/whatsapp-token', (req, res) => {
  if (whatsappToken) {
    res.json({ token: whatsappToken });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Ruta para enviar mensajes de WhatsApp
app.post('/send-message', (req, res) => {
  const { token, number, message } = req.body;
  try {
    const decoded = jwt.verify(token, secretKey);
    client.sendMessage(number, message).then(response => {
      res.json({ status: 'success', response });
    }).catch(error => {
      res.status(500).json({ status: 'error', error });
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Ruta para obtener el código QR
app.get('/qr-code', (req, res) => {
  if (qrCodeUrl) {
    res.json({ qrCodeUrl }); // Enviar la URL del código QR almacenado
  } else {
    res.status(404).json({ message: 'QR code not available yet' });
  }
});

// Ruta para generar el código QR
app.get('/generate-qr', async (req, res) => {
  try {
    const qrCode = await qrcode.toDataURL('https://example.com'); // Generar el código QR con qrcode
    qrCodeUrl = qrCode; // Almacenar la URL generada para su uso posterior
    res.json({ qrCodeUrl }); // Enviar la URL del código QR generado
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
//version 7
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qr = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { exec } = require('child_process');
const path = require('path'); // Asegúrate de importar el módulo path

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" }), // Asegúrate de que el clientId sea único si tienes múltiples instancias
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' }
});

let qrCode = null;

client.on('authenticated', (session) => {
    console.log('Client has been authenticated!');
    sendTokenToSpringBoot(session); // Llama a una función para enviar el token JWT al backend de Spring Boot
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready and connected to WhatsApp!');
});

client.on('qr', code => {
    qrCode = code;
    console.log('QR RECEIVED', code);
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
    client.initialize(); // Re-initialize the client
});

client.initialize();

app.post('/send-message', (req, res) => {
  let { phoneNumber, message } = req.body;

  // Asegúrate de que el número de teléfono esté en el formato E.164
  phoneNumber = phoneNumber.replace(/\D/g, ''); // Remover caracteres no numéricos
  if (!phoneNumber.startsWith('593')) { // Reemplaza '593' con el código de tu país si es necesario
      phoneNumber = `593${phoneNumber}`;
  }

  client.sendMessage(`${phoneNumber}@c.us`, message)
      .then(() => {
          res.send('Message sent successfully!');
      })
      .catch((error) => {
          console.error('Error sending message:', error);
          res.status(500).send('Failed to send message');
      });
});


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

app.get('/qr-status', (req, res) => {
    res.send('ready');
});

// Función para enviar el token JWT al backend de Spring Boot
function sendTokenToSpringBoot(session) {
    const token = jwt.sign({ sessionId: session }, 'finsolred'); // Cambia 'tu_clave_secreta' por tu propia clave secreta

    axios.post('http://localhost:8080/whatsapp/authenticate', { token })
        .then(response => {
            console.log('Token enviado exitosamente a Spring Boot:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar el token a Spring Boot:', error);
        });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js ejecutándose en el puerto ${PORT}`);
});

