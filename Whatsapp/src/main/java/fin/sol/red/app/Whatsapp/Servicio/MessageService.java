package fin.sol.red.app.Whatsapp.Servicio;

import fin.sol.red.app.Whatsapp.Modelo.SendMessageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MessageService {

    public boolean sendMessageToWhatsApp(String phoneNumber, String message) {
        try {
            String url = "http://localhost:3000/send-message";
            RestTemplate restTemplate = new RestTemplate();
            SendMessageRequest request = new SendMessageRequest(phoneNumber, message);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}