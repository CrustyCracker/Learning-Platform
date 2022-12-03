package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/groups")
public class GroupController {
    private final ICardService cardService;

    @Autowired
    public GroupController(ICardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/forUser/{id}")
    public List<Group> forUser(Long id){
        return cardService.findGroupsByUser(id);
    }
}
