package mhmd.pzsp.PZSPApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @GetMapping("/start")
    public String helloWorld() {
        return "Dzień dobry";
    }
}
