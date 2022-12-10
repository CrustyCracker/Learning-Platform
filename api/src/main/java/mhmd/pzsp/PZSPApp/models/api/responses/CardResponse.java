package mhmd.pzsp.PZSPApp.models.api.responses;


import com.fasterxml.jackson.annotation.JsonIgnore;
import mhmd.pzsp.PZSPApp.models.Card;

public class CardResponse {
    // nie zwracamy Card bo nie chcemy zwracać danych usera przy każdej karcie
    public Long id;

    public String question;

    public String answer;

    public String source;

    public String username;

    @JsonIgnore
    public CardResponse(Card card){
        id = card.getId();
        question = card.getQuestion();
        answer = card.getAnswer();
        source = card.getSource();
        username = card.getUser().getUsername();
    }
}
