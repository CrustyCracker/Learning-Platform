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

    @Column(name = "OPIS")
    private String description;

    @ManyToMany
    @JoinTable(name = "ZGRUPOWANIA",
            joinColumns = @JoinColumn(name = "ID_GRUPY"),
            inverseJoinColumns = @JoinColumn(name = "ID_FISZKI"))
    List<Card> cards;

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
}
