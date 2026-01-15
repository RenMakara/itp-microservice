package co.istad.makara.customer_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {
    @GetMapping
    public String unsecureEndpoint(){
        return "Customer - unsecure endpoint";
    }
}
