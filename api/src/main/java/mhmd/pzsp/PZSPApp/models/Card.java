package mhmd.pzsp.PZSPApp.models;

import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "FISZKI")
public class Card {
    @Id
    @SequenceGenerator(name = "FISZKI_GEN", sequenceName = "FISZKI_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FISZKI_GEN")
    @Column(name = "ID_FISZKI", nullable = false)
    private Long id;

    @Column(name = "PYTANIE", nullable = false)
    private String question;

    @Column(name = "ODPOWIEDZ", nullable = false)
    private String answer;

    @Column(name = "ZRODLO", nullable = false)
    private String source;

    @Column(name = "PUBLICZNE", nullable = false)
    private boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "ID_UZYTKOWNIKA", nullable = false)
    private User user;

    @ManyToMany(mappedBy = "cards")
    public List<Group> groups;

    @ManyToMany(mappedBy = "cards")
    public List<Tag> tags;

    public Card(NewCardRequest request, User user, List<Group> groups, List<Tag> tags){
        this.question = request.question;
        this.answer = request.answer;
        this.source = request.source;
        this.user = user;
        setIsPublic(request.isPublic);
        this.groups = groups;
        this.tags = tags;
    }

    public Card(String question, String answer, String source, User user, boolean isPublic){
        this.question = question;
        this.answer = answer;
        this.source = source;
        this.user = user;
        setIsPublic(isPublic);
        this.tags = new ArrayList<>();
        this.groups = new ArrayList<>();
    }

    public Card(long id, String question, String answer, String source, User user, boolean isPublic){
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.source = source;
        this.user = user;
        setIsPublic(isPublic);
        this.tags = new ArrayList<>();
        this.groups = new ArrayList<>();
    }

    public Card() {

    }

    public User getUser() {
        return user;
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

    public boolean IsPublic() {
        return isPublic;
    }

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public Long getId() {
        return id;
    }

    public void setId (Long id) {
        this.id = id;
    }
}
