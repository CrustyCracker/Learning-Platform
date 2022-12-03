package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService implements ICardService {
    @Autowired
    private ICardRepository cardRepository;
    @Autowired
    private IGroupRepository groupRepository;

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
}
