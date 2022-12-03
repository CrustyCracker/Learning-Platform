package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cards")
public class CardController {
    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/first")
    public Card first() {
        var cards = cardService.findAll();
        return cards.get(0);
    }
}
