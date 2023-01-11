package mhmd.pzsp.PZSPApp.ControllerTests;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import mhmd.pzsp.PZSPApp.controller.CardController;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.IdRequestBase;
import mhmd.pzsp.PZSPApp.models.api.responses.CardResponse;
import mhmd.pzsp.PZSPApp.security.JwtTokenFilter;
import mhmd.pzsp.PZSPApp.services.CardService;
import mhmd.pzsp.PZSPApp.services.GroupService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(CardController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CardControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtTokenFilter jwtTokenFilter;
    @MockBean
    private CardService cardService;

    @MockBean
    private GroupService groupService;
    final ObjectMapper objectMapper = new ObjectMapper();
    @Test
    public void testGetFirst() throws Exception {
        User user = new User("user", "abcd", "email@test.mhmd", "pepper");
        Card card = new Card("pytanietestowe", "odpowiedztestowa", "zrodlotestowe", user, false);
        List<Card> cards = new ArrayList<>();
        cards.add(card);

        when(cardService.findAllCards()).thenReturn(cards);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cards/first");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        CardResponse cardResponse = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(cardResponse.question).isEqualTo(card.getQuestion());
        assertThat(cardResponse.answer).isEqualTo(card.getAnswer());
        assertThat(cardResponse.source).isEqualTo(card.getSource());
    }

//    @Test
//    @WithMockUser(value = "user")
//    public void testGetAll() throws Exception {
//        User user = new User(1, "user", "abcd", "email@test.mhmd", "pepper");
//        List<Card> cards = new ArrayList<>();
//        for (int i = 1; i <= 5; i++)
//            cards.add(new Card("pytanietestowe", "odpowiedztestowa", "zrodlotestowe", user, false));
//        List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
//        grantedAuthorityList.add(new SimpleGrantedAuthority(Roles.USER.toString()));
//        when(cardService.findPublicOrUsers(user.getId())).thenReturn(cards);
//        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cards/all");
//        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
//        String response = result.getResponse().getContentAsString();
//        List<CardResponse> cardResponses = objectMapper.readValue(response, new TypeReference<List<CardResponse>>() {});
//        Assertions.assertThat(cardResponses.size()).isEqualTo(cards.size()).isEqualTo(5);
//    }

    @Test
    public void testGetCardById() throws Exception {
        User user = new User("user", "abcd", "email@test.mhmd", "pepper");
        Card card = new Card(1, "pytanietestowe", "odpowiedztestowa", "zrodlotestowe", user, false);

        when(cardService.findCardById(card.getId())).thenReturn(card);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cards/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        CardResponse cardResponse = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(cardResponse.question).isEqualTo(card.getQuestion());
        assertThat(cardResponse.answer).isEqualTo(card.getAnswer());
        assertThat(cardResponse.source).isEqualTo(card.getSource());
    }

    @Test
    public void testGetCardsByGroupId() throws Exception {
        User user = new User(1, "user", "abcd", "email@test.mhmd", "pepper");
        List<Card> cards = new ArrayList<>();
        for (int i = 1; i <= 5; i++)
            cards.add(new Card("pytanietestowe", "odpowiedztestowa", "zrodlotestowe", user, false));

        when(cardService.findCardsByGroupsId(1L)).thenReturn(cards);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cards/group/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        List<CardResponse> cardResponses = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(cardResponses.size()).isEqualTo(5);
    }

    @Test
    public void testDelete() throws Exception {
        when(cardService.delete(1L)).thenReturn(Boolean.TRUE);
        IdRequestBase id = new IdRequestBase();
        id.id = 1L;
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/cards/delete")
                .content(objectMapper.writeValueAsString(id))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        Boolean boolResponse = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(boolResponse).isTrue();
    }
}
