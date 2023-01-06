package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.models.api.requests.EditGroupRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.IdRequestBase;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.GroupResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/groups")
public class GroupController {
    private final IGroupService groupService;

    @Autowired
    public GroupController(IGroupService groupService) {
        this.groupService = groupService;
    }


    @GetMapping("/all")
    public List<GroupResponse> all() throws BackendException {
        var response = new ArrayList<GroupResponse>();
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");

        var groups = groupService.findPublicOrUsers(user.getId());
        groups.forEach(group -> response.add(new GroupResponse(group)));
        return response;
    }

    @GetMapping("/owned")
    public List<GroupResponse> owned() throws BackendException {
        var response = new ArrayList<GroupResponse>();
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");

        groupService.findGroupsByUser(user.getId()).forEach(group ->  response.add(new GroupResponse(group)));
        return response;
    }

    @PostMapping("/create")
    public GroupResponse create(@RequestBody NewGroupRequest request) throws BackendException {
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");
        return new GroupResponse(groupService.create(request, user));
    }

    @GetMapping("{id}")
    public GroupResponse groupById(@PathVariable Long id) throws BackendException {
        var group = groupService.findGroupById(id);
        if (group == null)
            throw new BackendException("Brak grupy o danym id w bazie danych");
        return new GroupResponse(group);
    }

    @PostMapping("/edit")
    public GroupResponse edit(@RequestBody EditGroupRequest request) throws BackendException {
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");
        return new GroupResponse(groupService.edit(request, user));
    }

    @DeleteMapping("delete")
    public boolean delete(@RequestBody IdRequestBase request) throws BackendException {
        return groupService.delete(request.id);
    }
}
