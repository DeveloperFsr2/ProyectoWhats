package fin.sol.red.app.Whatsapp.Controlador;
import fin.sol.red.app.Whatsapp.Modelo.SendMessageRequest;
import fin.sol.red.app.Whatsapp.Modelo.TokenRequest;
import fin.sol.red.app.Whatsapp.Servicio.AuthService;
import fin.sol.red.app.Whatsapp.Servicio.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WhatsappController {

    @Autowired
    private AuthService authService;

    @Autowired
    private MessageService messageService;

    @PostMapping("/whatsapp/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody TokenRequest tokenRequest) {
        String token = tokenRequest.getToken();

        if (authService.isValidToken(token)) {
            return ResponseEntity.ok("Token válido");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido");
        }
    }

    @PostMapping("/whatsapp/send-message")
    public ResponseEntity<String> sendMessage(@RequestBody SendMessageRequest sendMessageRequest) {
        String phoneNumber = sendMessageRequest.getPhoneNumber();
        String message = sendMessageRequest.getMessage();

        boolean messageSent = messageService.sendMessageToWhatsApp(phoneNumber, message);

        if (messageSent) {
            return ResponseEntity.ok("Mensaje enviado exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el mensaje");
        }
    }

    @GetMapping("/whatsapp/sendd-messages")
    public ResponseEntity<String> sendMessages() {
        List<String> lista = new ArrayList<>();
        lista.add("593985623038");
        lista.add("593979235851");
        lista.add("593968451618");
        lista.add("593968964169");

        boolean allMessagesSent = true;
        StringBuilder failedNumbers = new StringBuilder();

        for (String num : lista) {
            boolean messageSent = messageService.sendMessageToWhatsApp(num, "HOLA ESTO ES UNA PRUEBA");
            if (!messageSent) {
                allMessagesSent = false;
                failedNumbers.append(num).append(" ");
            }
        }

        if (allMessagesSent) {
            return ResponseEntity.ok("Todos los mensajes fueron enviados exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar mensajes a los números: " + failedNumbers.toString().trim());
        }
    }


}