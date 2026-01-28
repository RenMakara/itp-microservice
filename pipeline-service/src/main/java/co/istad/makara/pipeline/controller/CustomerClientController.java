package co.istad.makara.pipeline.controller;

import co.istad.makara.pipeline.client.CustomerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/client/customer")
@RequiredArgsConstructor
public class CustomerClientController {

    private final CustomerClient customerClient;

    @GetMapping("cus")
    public Map<String, Object> getCustomers() {
        return customerClient.getCustomers();
    }
}
