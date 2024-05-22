package fin.sol.red.app.Whatsapp;/* fin.sol.red.app.Whatsapp;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

    @Service
    public class WhatsAppService {

        public String sendMessage(String phoneNumber, String message) {
            // URL del punto final del servidor Node.js
            String url = "http://localhost:3000/send-message";

            // Verifica si el código QR está listo antes de enviar mensajes
            RestTemplate restTemplate = new RestTemplate();
            String qrStatus = restTemplate.getForObject("http://localhost:3000/qr-status", String.class);

            if (!"ready".equals(qrStatus)) {
                return "QR code is not ready yet";
            }

            // Crear un objeto RestTemplate para enviar la solicitud HTTP POST
            RestTemplate restTemplate1 = new RestTemplate();

            // Crear un objeto que representa los datos del mensaje
            WhatsAppModel whatsappMessage = new WhatsAppModel(phoneNumber, message);

            // Enviar la solicitud HTTP POST al servidor Node.js
            String response = restTemplate1.postForObject(url, whatsappMessage, String.class);

            return response;
        }
    }

*/
import java.util.UUID;

import fin.sol.red.app.Whatsapp.WhatsAppModel;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WhatsAppService {

    private final RestTemplate restTemplate;

    public WhatsAppService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String sendMessage(String phoneNumber, String message) {
        // URL del punto final del servidor Node.js
        String url = "http://localhost:3000/send-message";

        // Verificar si el código QR está listo antes de enviar mensajes
        String qrStatus = restTemplate.getForObject("http://localhost:3000/qr-status", String.class);

        if (!"ready".equals(qrStatus)) {
            return "QR code is not ready yet";
        }

        // Crear un objeto que representa los datos del mensaje
        WhatsAppModel whatsappMessage = new WhatsAppModel(phoneNumber, message);

        try {
            // Enviar la solicitud HTTP POST al servidor Node.js
            String response = restTemplate.postForObject(url, whatsappMessage, String.class);
            return response;
        } catch (Exception e) {
            // Manejar errores de manera adecuada
            e.printStackTrace();
            return "Failed to send message";
        }
    }

    public String handleAuthentication() {
        // Generar un UUID único para la autenticación
        UUID authenticationId = UUID.randomUUID();
        String authenticationStatus = "authenticated";

        // Aquí puedes manejar la autenticación de WhatsApp
        // Por ejemplo, puedes almacenar el estado y el ID de autenticación en una base de datos
        // o realizar alguna otra lógica de negocio
        // Tu lógica de negocio aquí

        // Ejemplo: Almacenar el estado de autenticación y el ID en una base de datos
        // Tu lógica de almacenamiento aquí

        return "Authentication status: " + authenticationStatus + ", Authentication ID: " + authenticationId.toString();
    }
}

