package co.istad.makara.account_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/accounts")
public class AccountController {
    @GetMapping
    public String unsecureEndpoint(){
        return "Account - unsecure endpoint";
    }
}
