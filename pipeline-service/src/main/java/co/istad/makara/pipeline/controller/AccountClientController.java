package co.istad.makara.pipeline.controller;


import co.istad.makara.pipeline.client.AccountClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/client/account")
@RequiredArgsConstructor
public class AccountClientController {

    private final AccountClient accountClient;

    @GetMapping("/secured")
    public Map<String, Object> getAccounts() {
        return accountClient.getAccounts();
    }
}
