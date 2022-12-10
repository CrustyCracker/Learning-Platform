package mhmd.pzsp.PZSPApp.models;

import org.apache.commons.codec.binary.Hex;

import javax.persistence.*;
import java.util.ArrayList;
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
    private String username;

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

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "ID_UZYTKOWNIKA")
    public List<Card> cards;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_UZYTKOWNIKA")
    public List<Group> groups;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_UZYTKOWNIKA")
    public List<Tag> tags;

    public User(String username, String password, String email, String salt){
        this.username = username;
        this.password = password;
        this.email = email;
        this.salt = salt;

        this.admin = '0';
        this.dateJoined = new Date();
        this.cards = new ArrayList<>();
        this.tags = new ArrayList<>();
        this.groups = new ArrayList<>();
    }

    public User(String username, byte[] password, String email, byte[] salt){
        this.username = username;
        this.password = Hex.encodeHexString(password);
        this.email = email;
        this.salt = Hex.encodeHexString(salt);

        this.admin = '0';
        this.dateJoined = new Date();
        this.cards = new ArrayList<>();
        this.tags = new ArrayList<>();
        this.groups = new ArrayList<>();
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
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

    public String getPassword() {
        return password;
    }

    public String getSalt() {
        return salt;
    }
}
