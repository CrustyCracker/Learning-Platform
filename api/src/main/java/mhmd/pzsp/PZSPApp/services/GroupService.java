package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService implements IGroupService {
    @Autowired
    private IGroupRepository groupRepository;
    @Autowired
    private ICardRepository cardRepository;

    @Override
    public Group create(NewGroupRequest request, User user) {
        List<Card> cards = new ArrayList<>();

        if (!request.cardIds.isEmpty())
            cards = cardRepository.findByIdIn(request.cardIds);

        var group = new Group(request, user, cards);
        return groupRepository.save(group);
    }

    @Override
    public List<Group> findGroupsByUser(Long userId) {
        return groupRepository.findByUserId(userId);
    }
}
