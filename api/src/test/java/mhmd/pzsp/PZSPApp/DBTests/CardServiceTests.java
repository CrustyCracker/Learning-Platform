package mhmd.pzsp.PZSPApp.DBTests;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.Tag;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.ITagRepository;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CardServiceTests {

    // pzsp2 dodać podobne testy tylko do GroupService
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ICardRepository cardRepository;
    @Autowired
    private ITagRepository tagRepository;
    @Autowired
    private ICardService cardService;

    private static final String username = "testowyuser";
    private static final String question = "pytanietestowe";
    private static final String tagname = "testowytag";

    @AfterEach
    @BeforeEach
    public void cleanData(){
        if (tagRepository.findByName(tagname).isPresent())
            tagRepository.deleteById(tagRepository.findByName(tagname).get().getId());
        if (!cardRepository.findByQuestion(question).isEmpty())
            cardRepository.deleteAll(cardRepository.findByQuestion(question));
        if (userRepository.findByUsername(username).isPresent()){
            userRepository.deleteById(userRepository.findByUsername(username).get().getId());
        }
    }

    private User addUser(){
        var user = new User(username, "hasło", "mail@gmail.com", "salt");
        return userRepository.save(user);
    }

    private Tag addTag(){
        var tag = new Tag(tagname, "123456", List.of(), null);
        return tagRepository.save(tag);
    }

    @Test
    public void testAddCard(){
        var user = addUser();
        var request = new NewCardRequest(question, "b", true, "c", null, null);

        var created = cardService.create(request, user);
        assertEquals(created.getQuestion(), question);
        assertEquals(created.getAnswer(), request.answer);
        assertEquals(created.getUser().getId(), user.getId());
        assertEquals(0, created.tags.size());
        assertEquals(0, created.groups.size());
        assertEquals(created.IsPublic(), request.isPublic);

        var updatedUser = userRepository.findByUsername(username);
        if (updatedUser.isEmpty())
            fail();

        assertEquals(1, updatedUser.get().cards.size());
        assertTrue(user.cards.isEmpty());
        assertEquals(request.source, updatedUser.get().cards.get(0).getSource());
    }

    @Test void testAddCard_withTag(){
        var user = addUser();
        var tag = addTag();

        var request = new NewCardRequest(question, "b", false, "c", null, List.of(tag.getId()));

        var created = cardService.create(request, user);
        assertEquals(created.getQuestion(), question);
        assertEquals(created.getAnswer(), request.answer);
        assertEquals(created.getUser().getId(), user.getId());
        assertEquals(1, created.tags.size());
        assertEquals(created.tags.get(0).getName(), tagname);
        assertEquals(created.tags.get(0).getId(), tag.getId());
        assertEquals(0, created.groups.size());
        assertEquals(created.IsPublic(), request.isPublic);
    }
}
