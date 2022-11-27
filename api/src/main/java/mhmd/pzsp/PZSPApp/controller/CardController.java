package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.services.CardService;
import org.json.JSONException;
import org.json.JSONObject;
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
    public String getCards() throws JSONException {
        var cards = cardService.findAll();
        var json = new JSONObject();
        json.put("question", cards.get(0).getQuestion());
        return json.toString();
        // pzsp2 ten wyjątek obsłużyć
    }
}
