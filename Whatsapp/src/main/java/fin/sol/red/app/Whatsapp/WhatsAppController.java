package fin.sol.red.app.Whatsapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WhatsAppController {

    @Autowired
    private WhatsAppService whatsappService;

    @PostMapping("/send-whatsapp-message")
    public String sendWhatsAppMessage(@RequestBody WhatsAppModel whatsappMessage) {
        return whatsappService.sendMessage(whatsappMessage.getPhoneNumber(), whatsappMessage.getMessage());
    }

    @PostMapping("/whatsapp/authenticated")
    public String authenticated(@RequestBody String authenticationStatus) {
        // Manejar la autenticación de WhatsApp aquí
        return "Authentication status: " + authenticationStatus;
    }
}
