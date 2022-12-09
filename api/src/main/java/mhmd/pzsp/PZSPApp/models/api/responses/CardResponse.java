package mhmd.pzsp.PZSPApp.models.api.responses;


import mhmd.pzsp.PZSPApp.models.Card;

public class CardResponse {
    // nie zwracamy Card bo nie chcemy zwracać danych usera przy każdej karcie

    public CardResponse(Card card){
        id = card.getId();
        question = card.getQuestion();
        answer = card.getAnswer();
        source = card.getSource();
        username = card.getUser().getUsername();
    }
    private final Long id;

    private String question;

    private String answer;

    private String source;

    private String username;

    public Long getId() {
        return id;
    }

    public String getUser() {
        return username;
    }

    public void setUser(String username) {
        this.username = username;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
