package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.interfaces.IAccountService;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;
import mhmd.pzsp.PZSPApp.models.api.responses.GroupResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/groups")
public class GroupController {
    private final IGroupService groupService;
    private final IAccountService accountService;

    @Autowired
    public GroupController(IAccountService accountService, IGroupService groupService) {
        this.accountService = accountService;
        this.groupService = groupService;
    }

    @GetMapping("/forUser/{id}")
    public List<GroupResponse> forUser(@PathVariable Long id, Authentication authentication) {
        var response = new ArrayList<GroupResponse>();
        groupService.findGroupsByUser(id).forEach(group ->  response.add(new GroupResponse(group)));
        return response;
    }

    @PostMapping("/create")
    public GroupResponse create(@RequestBody NewGroupRequest request, Authentication authentication) throws BackendException {
        // tu się powinno brać obecnie zalogowanego usera z security contextu, a nie pierwszego admina
        // ta sama historia co dla
        var user = accountService.defaultAdmin();
        return new GroupResponse(groupService.create(request, user));
    }
}
