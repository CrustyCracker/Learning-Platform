package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CardController {
    @Autowired
    private CardService cardService;

    @GetMapping("/cards")
    public String helloWorld() {
        return cardService.findAll().toString();
    }
}
