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

    @Column(name = "HASLO", nullable = false)
    private String password;

    @Column(name = "SALT", nullable = false)
    private String salt;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "ADMIN", nullable = false)
    private Character admin;

    @Column(name = "DATA_DOLACZENIA")
    private Date dateJoined;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "ID_UZYTKOWNIKA")
    public List<Card> cards;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "ID_UZYTKOWNIKA")
    public List<Group> groups;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_UZYTKOWNIKA")
    public List<Tag> tags;

    public User(String login, String password, String email, String salt){
        this.login = login;
        this.password = password;
        this.email = email;
        this.salt = salt;

        this.admin = '0';
        this.dateJoined = new Date();
    }

    public User() {

    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
}
