package fin.sol.red.app.Whatsapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WhatsAppController {

    private WhatsAppService whatsappService;

    @Autowired
    public WhatsAppController(WhatsAppService whatsappService) {
        this.whatsappService = whatsappService;
    }


    @PostMapping("/send-whatsapp-message")
    public String sendWhatsAppMessage(@RequestBody WhatsAppModel whatsappMessage) {
        return whatsappService.sendMessage(whatsappMessage.getPhoneNumber(), whatsappMessage.getMessage());
    }

    @PostMapping("/whatsapp/authenticated")
    public String authenticated() {
        // Manejar la autenticación de WhatsApp llamando al método correspondiente en el servicio
        String authenticationStatus = whatsappService.handleAuthentication();
        return authenticationStatus;
    }
}
