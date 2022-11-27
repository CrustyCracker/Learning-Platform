package mhmd.pzsp.PZSPApp.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "TAGI")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_TAGU", nullable = false)
    private Long id;

    @Column(name = "NAZWA", nullable = false, unique = true)
    private String name;

    @Column(name = "KOLOR", nullable = false)
    private String colour;

    @ManyToMany
    @JoinTable(name = "OTAGOWANIA",
            joinColumns = @JoinColumn(name = "ID_TAGU"),
            inverseJoinColumns = @JoinColumn(name = "ID_FISZKI"))
    List<Card> cards;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }
}
