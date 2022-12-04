package mhmd.pzsp.PZSPApp;

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

	@BeforeEach
	void ensureNoTestData(){
        if (!groupRepository.findByName(groupName).isEmpty())
            groupRepository.deleteAll(groupRepository.findByName(groupName));
        if (!tagRepository.findByName(tagName).isEmpty())
            tagRepository.deleteAll(tagRepository.findByName(tagName));
        if (!cardRepository.findByQuestion(testQuestion).isEmpty())
            cardRepository.deleteAll(cardRepository.findByQuestion(testQuestion));
		if (userRepository.findByLogin(testName).isPresent()){
			var id = userRepository.findByLogin(testName).get().getId();
			userRepository.deleteById(id);
		}
        userRepository.flush();
	}

	@AfterEach
	void deleteTestData(){
        if (!groupRepository.findByName(groupName).isEmpty())
            groupRepository.deleteAll(groupRepository.findByName(groupName));
        if (!tagRepository.findByName(tagName).isEmpty())
            tagRepository.deleteAll(tagRepository.findByName(tagName));
        if (!cardRepository.findByQuestion(testQuestion).isEmpty())
            cardRepository.deleteAll(cardRepository.findByQuestion(testQuestion));
		if (userRepository.findByLogin(testName).isPresent()){
			var id = userRepository.findByLogin(testName).get().getId();
			userRepository.deleteById(id);
		}
        userRepository.flush();
	}

	@Test
	void testUserRepository_add(){
		var newUser = new User(testName, "123456789", "test@gmail.com", "1234567890123456");
		assertTrue(userRepository.findByLogin(testName).isEmpty());

		userRepository.save(newUser);
		assertTrue(userRepository.findByLogin(testName).isPresent());

		var addedUser = userRepository.findByLogin(testName).get();
		assertEquals(addedUser.getPassword().strip(), newUser.getPassword());
		assertEquals(addedUser.getSalt(), newUser.getSalt());
		assertEquals('0', (char) addedUser.getAdmin());
		assertEquals(addedUser.getEmail(), newUser.getEmail());
	}

    @Test
    void testUserRepository_remove(){
        var newUser = new User(testName, "123456789", "test@gmail.com", "1234567890123456");
        userRepository.save(newUser);
        assertTrue(userRepository.findByLogin(testName).isPresent());

        userRepository.delete(newUser);
        assertTrue(userRepository.findByLogin(testName).isEmpty());
    }

    @Test
    void testUserRepository_update(){
        var newUser = new User(testName, "123456789", "test@gmail.com", "1234567890123456");
        userRepository.save(newUser);
        var DBUser = userRepository.findByLogin(testName);
        assertTrue(DBUser.isPresent());

        DBUser.get().setEmail("zupełnie inny mail");
        userRepository.save(DBUser.get());

        assertTrue(userRepository.findByLogin(testName).isPresent());
        assertEquals(userRepository.findByLogin(testName).get().getEmail(), DBUser.get().getEmail());
        assertEquals(userRepository.findByLogin(testName).get().getEmail(), "zupełnie inny mail");
    }

    @Test
    void testUserRepository_withCard(){
        var newUser = new User(testName, "123456789", "test@gmail.com", "1234567890123456");
        var newCard = new Card(testQuestion, "Odpowiedź", "Źródło", newUser, true);
        assertTrue(cardRepository.findByQuestion(testQuestion).isEmpty());

        userRepository.save(newUser);
        cardRepository.save(newCard);

        var DBUser = userRepository.findByLogin(testName);
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
        var newUser = new User(testName, "123456789", "test@gmail.com", "1234567890123456");
        var newCard = new Card(testQuestion, "Odpowiedź", "Źródło", newUser, true);
        var newGroup = new Group(groupName, newUser, 1, true, "Testowa grupa", List.of(newCard));

        assertTrue(groupRepository.findByName(groupName).isEmpty());

        userRepository.save(newUser);
        assertTrue(userRepository.findByLogin(testName).isPresent());
        var DBUser = userRepository.findByLogin(testName).get();

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
