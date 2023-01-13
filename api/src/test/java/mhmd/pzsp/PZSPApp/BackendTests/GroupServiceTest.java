package mhmd.pzsp.PZSPApp.BackendTests;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.EditGroupRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import mhmd.pzsp.PZSPApp.services.GroupService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
public class GroupServiceTest {
    @Mock
    IGroupRepository groupRepository;

    @Mock
    ICardRepository cardRepository;

    @InjectMocks
    GroupService groupService;

    @Test
    public void createTest() throws Exception {
        User user = new User("user", "pass", "mail", "pepper");
        List<Card> cardList = new ArrayList<>();
        for (int i = 1; i <= 5; i++)
            cardList.add(new Card(i, "q", "a", "s", user, false));
        when(cardRepository.findByIdIn(any())).thenReturn(cardList);
        when(groupRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        List<Long> ids = cardList.stream().map(Card::getId).toList();
        NewGroupRequest request = new NewGroupRequest("n", 1, false, "desc", ids);
        Group group = groupService.create(request, user);
        assertThat(group.getName()).isEqualTo(request.name);
        assertThat(group.getDescription()).isEqualTo(request.description);
        assertThat(group.getDifficulty()).isEqualTo(request.difficulty);
    }

    @Test
    public void testEditGroup() throws Exception {
        User user = new User(1L, "user", "pass", "mail", "pepper");
        Group group = new Group(1, "n", user, 3, false, "desc", new ArrayList<>());
        EditGroupRequest request = new EditGroupRequest(1L, "N", 1, false, "desc", new ArrayList<>());
        when(groupRepository.findGroupById(any())).thenReturn(group);
        when(groupRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        Group result = groupService.edit(request, user);
        assertThat(result.getName()).isEqualTo(request.name);
        assertThat(result.getDescription()).isEqualTo(request.description);
        assertThat(result.getDifficulty()).isEqualTo(request.difficulty);
    }
}
