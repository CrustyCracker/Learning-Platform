package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.Tag;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import mhmd.pzsp.PZSPApp.repositories.ITagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CardService implements ICardService {
    @Autowired
    private ICardRepository cardRepository;
    @Autowired
    private IGroupRepository groupRepository;
    @Autowired
    private ITagRepository tagRepository;

    @Override
    public List<Card> findAllCards(){
        return cardRepository.findAll();
    }

    @Override
    public List<Card> findCardsByUser(Long userId) {
        return cardRepository.findByUserId(userId);
    }

    @Override
    public List<Group> findGroupsByUser(Long userId) {
        return groupRepository.findByUserId(userId);
    }

    @Override
    public Card create(NewCardRequest request, User user){
        var tags = new ArrayList<Tag>();
        var groups = new ArrayList<Group>();

        if (!request.tagIds.isEmpty())
            request.tagIds.forEach(id -> {
                var tag = tagRepository.findById(id);
                tag.ifPresent(tags::add);
            });

        if (!request.groupIds.isEmpty())
            request.groupIds.forEach(id -> {
                var tag = groupRepository.findById(id);
                tag.ifPresent(groups::add);
            });

        var card = new Card(request, user, groups, tags);
        return cardRepository.save(card);
    }
}
