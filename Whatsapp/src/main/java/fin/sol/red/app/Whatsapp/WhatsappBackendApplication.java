package fin.sol.red.app.Whatsapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class WhatsappBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(WhatsappBackendApplication.class, args);
    }
}

@RestController
class WhatsappController {

    @PostMapping("/whatsapp/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody TokenRequest tokenRequest) {
        // Aquí puedes agregar la lógica para validar el token JWT recibido del cliente
        // y autenticar al usuario en tu backend

        String token = tokenRequest.getToken();
        // Verificar y validar el token JWT

        if (token != null && !token.isEmpty()) {
            // El token es válido, puedes realizar las operaciones de envío de mensajes de WhatsApp
            // Utiliza el token para autenticar las solicitudes al servidor Node.js
            // Aquí puedes agregar la lógica para enviar mensajes de WhatsApp utilizando el token recibido

            String message = "Hola desde Spring Boot!"; // Mensaje de ejemplo
            String phoneNumber = "+593959147219"; // Número de teléfono de destino

            // Enviar el mensaje de WhatsApp utilizando el token y los datos del mensaje
            boolean messageSent = sendMessageToWhatsApp(token, phoneNumber, message);

            if (messageSent) {
                return ResponseEntity.ok("Mensaje enviado exitosamente");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el mensaje");
            }
        } else {
            // El token es inválido o está vacío
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido");
        }
    }

    private boolean sendMessageToWhatsApp(String token, String phoneNumber, String message) {
        try {
            // Construir la URL del endpoint de envío de mensajes en tu servidor Node.js
            String url = "http://localhost:3000/send-message";

            // Crear un objeto RestTemplate para realizar la solicitud POST al servidor Node.js
            RestTemplate restTemplate = new RestTemplate();

            // Construir el objeto de la solicitud para enviar al servidor Node.js
            SendMessageRequest request = new SendMessageRequest(token, phoneNumber, message);

            // Enviar la solicitud POST al servidor Node.js
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            // Verificar si el mensaje se envió con éxito (puedes agregar más validaciones si es necesario)
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

class TokenRequest {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

class SendMessageRequest {
    private String token;
    private String phoneNumber;
    private String message;

    public SendMessageRequest(String token, String phoneNumber, String message) {
        this.token = token;
        this.phoneNumber = phoneNumber;
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getToken() {
        return token;
    }
}
