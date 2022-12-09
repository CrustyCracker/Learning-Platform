package mhmd.pzsp.PZSPApp.DBTests;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
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
class RepositoryTests {
	@Autowired
	private IUserRepository userRepository;
    @Autowired
    private IGroupRepository groupRepository;
    @Autowired
    private ITagRepository tagRepository;
    @Autowired
    private ICardRepository cardRepository;

	private static final String testName = "testowy";
    private static final String testQuestion = "Pytanie";
    private static final String tagName = "pzsp2";
    private static final String groupName = "grupaTestowa";
    private static final String hash = "12345678";
    private static final String salt = "90123456";

	@BeforeEach
    @AfterEach
	void ensureNoTestData(){
        if (!groupRepository.findByName(groupName).isEmpty())
            groupRepository.deleteAll(groupRepository.findByName(groupName));
        if (!tagRepository.findByName(tagName).isEmpty())
            tagRepository.deleteAll(tagRepository.findByName(tagName));
        if (!cardRepository.findByQuestion(testQuestion).isEmpty())
            cardRepository.deleteAll(cardRepository.findByQuestion(testQuestion));
		if (userRepository.findByUsername(testName).isPresent()){
			var id = userRepository.findByUsername(testName).get().getId();
			userRepository.deleteById(id);
		}
        userRepository.flush();
	}

	@Test
	void testUserRepository_add(){
		var newUser = new User(testName, hash, "test@gmail.com", salt);
		assertTrue(userRepository.findByUsername(testName).isEmpty());

		userRepository.save(newUser);
		assertTrue(userRepository.findByUsername(testName).isPresent());

		var addedUser = userRepository.findByUsername(testName).get();
		assertEquals(addedUser.getPassword(), newUser.getPassword());
		assertEquals(addedUser.getSalt(), newUser.getSalt());
		assertEquals('0', (char) addedUser.getAdmin());
		assertEquals(addedUser.getEmail(), newUser.getEmail());
	}

    @Test
    void testUserRepository_remove(){
        var newUser = new User(testName, hash, "test@gmail.com", salt);
        userRepository.save(newUser);
        assertTrue(userRepository.findByUsername(testName).isPresent());

        userRepository.delete(newUser);
        assertTrue(userRepository.findByUsername(testName).isEmpty());
    }

    @Test
    void testUserRepository_update(){
        var newUser = new User(testName, hash, "test@gmail.com", salt);
        userRepository.save(newUser);
        var DBUser = userRepository.findByUsername(testName);
        assertTrue(DBUser.isPresent());

        DBUser.get().setEmail("zupełnie inny mail");
        userRepository.save(DBUser.get());

        assertTrue(userRepository.findByUsername(testName).isPresent());
        assertEquals(userRepository.findByUsername(testName).get().getEmail(), DBUser.get().getEmail());
        assertEquals(userRepository.findByUsername(testName).get().getEmail(), "zupełnie inny mail");
    }

    @Test
    void testUserRepository_withCard(){
        var newUser = new User(testName, hash, "test@gmail.com", salt);
        var newCard = new Card(testQuestion, "Odpowiedź", "Źródło", newUser, true);
        assertTrue(cardRepository.findByQuestion(testQuestion).isEmpty());

        userRepository.save(newUser);
        cardRepository.save(newCard);

        var DBUser = userRepository.findByUsername(testName);
        assertTrue(DBUser.isPresent());

        assertFalse(DBUser.get().cards.isEmpty());
        assertEquals(1, DBUser.get().cards.size());
        var sigleCard = DBUser.get().cards.get(0);
        assertEquals(sigleCard.getQuestion(), newCard.getQuestion());
        assertEquals(sigleCard.getAnswer(), newCard.getAnswer());
        assertEquals(sigleCard.IsPublic(), newCard.IsPublic());
        assertEquals(sigleCard.getSource(), newCard.getSource());
        assertEquals(sigleCard.getUser().getId(), DBUser.get().getId());
    }

    @Test
    void testGroupRepository_withCardAndUser(){
        var newUser = new User(testName, hash, "test@gmail.com", salt);
        var newCard = new Card(testQuestion, "Odpowiedź", "Źródło", newUser, true);
        var newGroup = new Group(groupName, newUser, 1, true, "Testowa grupa", List.of(newCard));

        assertTrue(groupRepository.findByName(groupName).isEmpty());

        userRepository.save(newUser);
        assertTrue(userRepository.findByUsername(testName).isPresent());
        var DBUser = userRepository.findByUsername(testName).get();

        cardRepository.save(newCard);
        assertFalse(cardRepository.findByUserId(DBUser.getId()).isEmpty());
        var DBCard = cardRepository.findByUserId(DBUser.getId()).get(0);

        groupRepository.save(newGroup);
        assertFalse(groupRepository.findByUserId(DBUser.getId()).isEmpty());
        var DBGroup = groupRepository.findByUserId(DBUser.getId()).get(0);

        assertFalse(DBCard.groups.isEmpty());
        assertEquals(DBCard.groups.get(0).getId(), DBGroup.getId());

        assertTrue(DBGroup.IsPublic());
        assertFalse(DBGroup.cards.isEmpty());
        assertEquals(DBGroup.cards.get(0).getId(), DBCard.getId());
        assertEquals(DBGroup.getDifficulty(), newGroup.getDifficulty());
        assertEquals(DBGroup.getDescription(), newGroup.getDescription());
        assertEquals(DBGroup.getUser().getId(), DBUser.getId());
    }
}
