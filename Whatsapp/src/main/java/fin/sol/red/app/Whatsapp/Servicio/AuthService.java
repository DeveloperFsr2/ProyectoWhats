package fin.sol.red.app.Whatsapp.Servicio;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public boolean isValidToken(String token) {
        // Agrega aquí la lógica para validar el token JWT.
        return token != null && !token.isEmpty();
    }
}
