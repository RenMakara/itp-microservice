package co.istad.makara.customer_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    @GetMapping
    public Map<String, Object> getCustomers() {
        return Map.of(
                "id",1,
                "name", "Ren Makara",
                "Sex","No Experience",
                "age", "23",
                "isStudent", true,
                "address", "Kampong thom"
        );
    }
}
