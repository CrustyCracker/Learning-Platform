package mhmd.pzsp.PZSPApp.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "FISZKI")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_FISZKI", nullable = false)
    private Long id;

    @Column(name = "PYTANIE", nullable = false)
    private String question;

    @Column(name = "ODPOWIEDZ", nullable = false)
    private String answer;

    @Column(name = "ZRODLO", nullable = false)
    private String source;

    @ManyToOne
    @JoinColumn(name = "ID_UZYTKOWNIKA", nullable = false)
    private User user;

    @ManyToMany(mappedBy = "cards")
    private List<Group> groups;

    @ManyToMany(mappedBy = "cards")
    private List<Tag> tags;

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
