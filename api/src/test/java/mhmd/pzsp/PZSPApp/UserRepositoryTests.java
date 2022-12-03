package mhmd.pzsp.PZSPApp;

import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.repositories.IUserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class UserRepositoryTests {
	@Autowired
	private IUserRepository userRepository;

	private static final String testName = "testowy";

	@BeforeEach
	void ensureNoTestData(){
		if (userRepository.findByLogin(testName).isPresent()){
			var id = userRepository.findByLogin(testName).get().getId();
			userRepository.deleteById(id);
			userRepository.flush();
		}
	}

	@AfterEach
	void deleteTestData(){
		if (userRepository.findByLogin(testName).isPresent()){
			var id = userRepository.findByLogin(testName).get().getId();
			userRepository.deleteById(id);
		}
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

}
