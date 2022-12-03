package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.models.CardSimple;
import mhmd.pzsp.PZSPApp.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
    public CardSimple first() {
        var cards = cardService.findAllCards();
        return new CardSimple(cards.get(0));
    }

    @GetMapping("/forUser")
    public List<CardSimple> forUser(Long userId){
        var simpleCards = new ArrayList<CardSimple>();
        var cards = cardService.findCardsByUser(userId);
        cards.forEach(card -> simpleCards.add(new CardSimple(card)));
        return simpleCards;
    }
}
