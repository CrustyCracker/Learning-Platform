package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.Tag;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.EditCardRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import mhmd.pzsp.PZSPApp.repositories.ITagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;

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
    public Card create(NewCardRequest request, User user) throws BackendException, BackendSqlException {
        var card = createCard(request, user);
        try {
            return cardRepository.save(card);
        }
        catch (Exception e) {
            throw new BackendSqlException("Błąd podczas zapisywania fiszki");
        }
    }

    @Override
    public Card findCardById(Long cardId) throws BackendException {
        var card = cardRepository.findCardById(cardId);
        if (Objects.equals(card.getUser().getId(), Objects.requireNonNull(getCurrentUser()).getId())
                || card.IsPublic() || Objects.requireNonNull(getCurrentUser()).isAdmin()) {
            return card;
        }
        throw new BackendException("Nie można zobaczyć prywatnej karty innego użytkownika");
    }

    @Override
    public List<Card> findCardsByGroupsId(Long groupId) {
        return cardRepository.findCardsByGroupsId(groupId);
    }

    @Override
    public boolean delete(Long id) throws BackendException {
        if (id == null)
            throw new BackendException("Nie podano id");
        if (cardRepository.existsById(id)) {
            var card = cardRepository.findCardById(id);

            if (Objects.equals(card.getUser().getId(), Objects.requireNonNull(getCurrentUser()).getId())
                    || getCurrentUser().isAdmin()) {

                cardRepository.deleteById(id);
                return true;
            }
            throw new BackendException("Nie można usunąć karty innego użytkownika");
        }
        throw new BackendException("Nie istnieje karta o podanym id");
    }

    @Override
    public Card edit(EditCardRequest request, User user) throws BackendException, BackendSqlException {
        if (request.id == null)
            throw new BackendException("Nie podano id edytowanej fiszki");

        var editedCard = cardRepository.findCardById(request.id);

        if (!editedCard.getUser().getId().equals(user.getId()) && !user.isAdmin())
            throw new BackendException("Nie masz uprawnień do edycji tej fiszki");

        var card = createCard(request, user);
        card.setId(editedCard.getId());

        try {
            return cardRepository.save(card);
        }
        catch (Exception e) {
            throw new BackendSqlException("Błąd podczas zapisywania fiszki");
        }
    }

    private Card createCard(NewCardRequest request, User user) throws BackendException {
        if (request.question == null)
            throw new BackendException("Nie podano pytania");

        if (request.answer == null)
            throw new BackendException("Nie podano odpowiedzi");

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

        return new Card(request, user, groups, tags);
    }
}
