package mhmd.pzsp.PZSPApp.ControllerTests;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import mhmd.pzsp.PZSPApp.controller.AccountController;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.LoginRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.RegisterRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.LoginResponse;
import mhmd.pzsp.PZSPApp.models.api.responses.RegisterResponse;
import mhmd.pzsp.PZSPApp.security.JwtTokenFilter;
import mhmd.pzsp.PZSPApp.services.AccountService;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AccountController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;
    final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private AccountService accountService;

    @MockBean
    private CardService cardService;

    @MockBean
    private GroupService groupService;

    @MockBean
    private JwtTokenFilter jwtTokenFilter;

    @Test
    public void testLogin() throws Exception {
        User user = new User(1, "usertestowy", "hasłotestowe", "emailtestowy", "pepper");
        LoginRequest loginRequest = new LoginRequest("user", "pass");
        when(accountService.login(any())).thenReturn(user);
        when(accountService.generateToken(user)).thenReturn("token");
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/account/login")
                .content(objectMapper.writeValueAsString(loginRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        LoginResponse loginResponse = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(loginResponse.username).isEqualTo(user.getUsername());
        assertThat(loginResponse.success).isTrue();
        assertThat(loginResponse.message).isEqualTo("Zalogowano");
    }

    @Test
    public void testRegister() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "testowyusername",
                "testowehasło",
                "testowehasło",
                "test@pzsp2.mhmd"
        );
        when(accountService.register(any())).thenReturn(true);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/account/register")
                .content(objectMapper.writeValueAsString(registerRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        RegisterResponse registerResponse = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(registerResponse.message).isEqualTo("Utworzono konto");
    }
}
