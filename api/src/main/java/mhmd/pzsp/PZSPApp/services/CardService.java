package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
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
    public List<Card> findPublicOrUsers(Long userId) {
        return cardRepository.findByUserIdOrPublic(userId, true);
    }

    @Override
    public List<Card> findCardsByUser(Long userId) {
        return cardRepository.findByUserId(userId);
    }

    @Override
    public Card create(NewCardRequest request, User user) throws BackendException {
        List<Tag> tags = new ArrayList<>();
        List<Group> groups = new ArrayList<>();

        if (request.tagIds != null && !request.tagIds.isEmpty())
            tags = tagRepository.findByIdIn(request.tagIds);

        if (request.groupIds != null && !request.groupIds.isEmpty())
            groups = groupRepository.findByIdIn(request.groupIds);

        for (Group group : groups) {
            if (group.isPublic() && !request.isPublic)
                throw new BackendException(String.format("Próba dodania prywatnej fiszki do niepublicznej grupy %s", group.getName()));
        }

        var card = new Card(request, user, groups, tags);
        return cardRepository.save(card);
    }

    @Override
    public Card findCardById(Long cardId) { return cardRepository.findCardById(cardId); }

    @Override
    public List<Card> findCardsByGroupsId(Long groupId) {
        return cardRepository.findCardsByGroupsId(groupId);
    }

    @Override
    public boolean delete(Long id) throws BackendException {
        if (cardRepository.existsById(id)) {
            var card = cardRepository.findCardById(id);
            // if (card.getUser() == weź obecnego usera)
            cardRepository.deleteById(id);
            return true;
        }
        throw new BackendException("Nie istnieje karta o podanym id");
    }
}
