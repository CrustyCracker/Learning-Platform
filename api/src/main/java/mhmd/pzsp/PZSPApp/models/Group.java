package mhmd.pzsp.PZSPApp.models;

import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "GRUPY")
public class Group {
    @Id
    @SequenceGenerator(name = "GRUPY_GEN", sequenceName = "GRUPY_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GRUPY_GEN")
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

    public Group(NewGroupRequest request, User user, List<Card> cards){
        this.name = request.name;
        this.difficulty = request.difficulty;
        this.setIsPublic(request.isPublic);
        this.user = user;
        this.description =  request.description;
        this.cards = cards;
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

    public User getUser() {
        return user;
    }

    public String getName() {
        return name;
    }

    public Integer getDifficulty() {
        return difficulty;
    }

    public String getDescription() {
        return description;
    }

    public boolean isPublic(){
        return visibility == 'G'; // G jak Global, Private i Public trochę by mieszało
    }

    public void setIsPublic(boolean isPublic){
        visibility = isPublic ? 'G' : 'P';
    }

    public void setId(Long id) {
        this.id = id;
    }
}
