package mhmd.pzsp.PZSPApp.models;


public class CardSimple {

    public CardSimple(Card card){
        id = card.getId();
        question = card.getQuestion();
        answer = card.getAnswer();
        source = card.getSource();
        userLogin = card.getUser().getLogin();
    }
    private final Long id;

    private String question;

    private String answer;

    private String source;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public String getUser() {
        return userLogin;
    }

    public void setUser(String username) {
        this.userLogin = username;
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
