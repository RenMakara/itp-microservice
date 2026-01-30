package co.istad.makara.account_service;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    @GetMapping
    public Map<String, Object> unsecureEndpoint(){
        return Map.of(
                "data", "Account - unsecure endpoint",
                "status", HttpStatus.OK.value()
        );
    }
}
