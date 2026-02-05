package co.istad.makara.account_service;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    @GetMapping
    public ResponseEntity<Map<String, Object> > unsecureEndpoint(){

        Map<String, Object> response = new HashMap<>();
        response.put("id", 1);
        response.put("name", "Ren Makara");
        response.put("age", 23);
        response.put("isStudent", true);
        response.put("address", "Kampong thom");
        response.put("Role", "Footballer");

        return ResponseEntity.ok(response);
    }
}
