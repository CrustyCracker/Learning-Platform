package mhmd.pzsp.PZSPApp.ControllerTests;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import mhmd.pzsp.PZSPApp.controller.GroupController;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.IdRequestBase;
import mhmd.pzsp.PZSPApp.models.api.responses.GroupResponse;
import mhmd.pzsp.PZSPApp.security.JwtTokenFilter;
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
@WebMvcTest(GroupController.class)
@AutoConfigureMockMvc(addFilters = false)
public class GroupControllerTest {
    @Autowired
    private MockMvc mockMvc;
    final ObjectMapper objectMapper = new ObjectMapper();
    @MockBean
    private JwtTokenFilter jwtTokenFilter;

    @MockBean
    private GroupService groupService;

    @Test
    public void testGetById() throws Exception {
        User user = new User("testowyusername", "testowehasło", "test@pzsp2.mhmd", "pepper");
        Group group = new Group(1, "testowagrupaname", user, 1, false, "description", null);
        when(groupService.findGroupById(1L)).thenReturn(group);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/groups/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        GroupResponse groupResponse = objectMapper.readValue(response, new TypeReference<>() {});
        assertThat(groupResponse.description).isEqualTo(group.getDescription());
    }

    @Test
    public void testDelete() throws Exception {
        when(groupService.delete(1L)).thenReturn(true);
        IdRequestBase id = new IdRequestBase();
        id.id = 1L;
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/groups/delete")
                .content(objectMapper.writeValueAsString(id))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String response = result.getResponse().getContentAsString();
        Boolean booleanResponse = objectMapper.readValue(response, new TypeReference<Boolean>() {});
        assertThat(booleanResponse).isTrue();
    }
}
