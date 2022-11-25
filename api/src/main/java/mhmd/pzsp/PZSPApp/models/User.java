package mhmd.pzsp.PZSPApp.models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "UZYTKOWNICY")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_UZYTKOWNIKA", nullable = false)
    private Long id;

    @Column(name = "LOGIN", nullable = false, unique = true)
    private String login;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "ADMIN", nullable = false)
    private Character admin;

    @Column(name = "DATA_DOLACZENIA")
    private Date dateJoined;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_FISZKI")
    private List<Card> cards;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_GRUPY")
    private List<Group> groups;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Character getAdmin() {
        return admin;
    }

    public void setAdmin(Character admin) {
        this.admin = admin;
    }

    public Date getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }
}
