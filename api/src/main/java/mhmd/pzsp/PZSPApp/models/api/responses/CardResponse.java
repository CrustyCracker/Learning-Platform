package mhmd.pzsp.PZSPApp.models.api.responses;


import mhmd.pzsp.PZSPApp.models.Card;

public class CardResponse {
    // nie zwracamy Card bo nie chcemy zwracać danych usera przy każdej karcie
    private final Long id;

    private final String question;

    private final String answer;

    private final String source;

    private final String username;

    public CardResponse(Card card){
        id = card.getId();
        question = card.getQuestion();
        answer = card.getAnswer();
        source = card.getSource();
        username = card.getUser().getUsername();
    }
}
