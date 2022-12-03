package mhmd.pzsp.PZSPApp.controller;

import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.services.CardService;
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
    private final CardService cardService;

    @Autowired
    public GroupController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/forUser")
    public List<Group> forUser(Long userId){
        return cardService.findGroupsByUser(userId);
    }
}
