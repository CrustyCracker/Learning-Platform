package mhmd.pzsp.PZSPApp.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "GRUPY")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_GRUPY", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_UZYTKOWNIKA", nullable = false)
    private User user;

    @Column(name = "NAZWA", nullable = false)
    private String name;

    @Column(name = "TRUDNOSC", nullable = false)
    private Integer difficulty;

    @Column(name = "WIDOCZNOSC", nullable = false)
    private Character visibility;

    @Column(name = "OPIS")
    private String description;

    @ManyToMany
    @JoinTable(name = "ZGRUPOWANIA",
            joinColumns = @JoinColumn(name = "ID_GRUPY"),
            inverseJoinColumns = @JoinColumn(name = "ID_FISZKI"))
    public List<Card> cards;

    public Group(String name, User user, Integer diff, boolean isPublic, String description){
        this.name = name;
        this.difficulty = diff;
        this.setIsPublic(isPublic);
        this.user = user;
        this.description = description;
    }

    public Group(String name, User user, Integer diff, boolean isPublic, String description, List<Card> cards){
        this.name = name;
        this.difficulty = diff;
        this.setIsPublic(isPublic);
        this.description = description;
        this.cards = cards;
        this.user = user;
    }

    public Group() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Integer difficulty) {
        this.difficulty = difficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean IsPublic(){
        return visibility == 'G'; // G jak Global, Private i Public trochę by mieszało
    }

    public void setIsPublic(boolean isPublic){
        visibility = isPublic ? 'G' : 'P';
    }
}
