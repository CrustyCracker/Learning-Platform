package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.interfaces.ITagService;
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
import java.util.stream.Collectors;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;

@Service
public class CardService implements ICardService {
    @Autowired
    private ICardRepository cardRepository;
    @Autowired
    private IGroupRepository groupRepository;
    @Autowired
    private ITagRepository tagRepository;
    @Autowired
    private ITagService tagService;

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

        updateGroups(editedCard, request.groupIds);
        updateTags(editedCard, request.tags);

        editedCard.setQuestion(request.question);
        editedCard.setAnswer(request.answer);
        editedCard.setSource(request.source);
        editedCard.setIsPublic(request.isPublic);

        try {
            return cardRepository.save(editedCard);
        }
        catch (Exception e) {
            throw new BackendSqlException("Błąd podczas zapisywania fiszki");
        }
    }

    private Card createCard(NewCardRequest request, User user) throws BackendException, BackendSqlException {
        if (request.question == null || request.question.isBlank())
            throw new BackendException("Nie podano pytania");

        if (request.answer == null || request.answer.isBlank())
            throw new BackendException("Nie podano odpowiedzi");

        List<Tag> tags = new ArrayList<>();
        List<Group> groups = new ArrayList<>();

        if (request.tags != null && !request.tags.isEmpty())
            tags = tagService.findOrCreateTag(request.tags);

        if (request.groupIds != null && !request.groupIds.isEmpty())
            groups = groupRepository.findByIdIn(request.groupIds);

        for (Group group : groups) {
            if (group.isPublic() && !request.isPublic)
                throw new BackendException(String.format("Próba dodania prywatnej fiszki do niepublicznej grupy %s", group.getName()));
        }
        var card = new Card(request, user, groups, tags);
        if (!groups.isEmpty()){
            for (Group group: groups) {
                group.cards.add(card);
            }
        }
        if (!tags.isEmpty()){
            for (Tag tag: tags) {
                tag.cards.add(card);
            }
        }
        return card;
    }

    private void updateGroups(Card card, List<Long> groupIds) {
        var cardGroupIds = card.groups.stream().map(Group::getId).toList();

        // Grupy, z których trzeba usunąć fiszkę
        List<Long> groupIdDiff = new ArrayList<> (cardGroupIds);
        groupIdDiff.removeAll(groupIds);

        if (!groupIdDiff.isEmpty()){
            var groups = groupRepository.findByIdIn(groupIdDiff);
            for (Group group: groups) {
                group.cards.remove(card);
            }
        }

        // Grupy, do których trzeba dodać fiszkę
        groupIdDiff = groupIds;
        groupIdDiff.removeAll(cardGroupIds);

        if (!groupIdDiff.isEmpty()){
            var groups = groupRepository.findByIdIn(groupIdDiff);
            for (Group group: groups) {
                group.cards.add(card);
            }
        }
    }

    private void updateTags(Card card, List<String> tagNames) throws BackendException, BackendSqlException {
        var editedCardTagNames = card.tags.stream().map(Tag::getName).toList();

        // Tagi, z których trzeba usunąć fiszkę
        List<String> tagNameDiff = new ArrayList<> (editedCardTagNames);
        tagNameDiff.removeAll(tagNames);

        if (!tagNameDiff.isEmpty()){
            var tags = tagRepository.findByNameIn(tagNameDiff);
            for (Tag tag: tags) {
                tag.cards.remove(card);
            }
        }

        // Tagi, do których trzeba dodać fiszkę
        tagNameDiff = tagNames;
        tagNameDiff.removeAll(editedCardTagNames);

        if (!tagNameDiff.isEmpty()){
            var tags = tagService.findOrCreateTag(tagNameDiff);
            for (Tag tag: tags) {
                tag.cards.add(card);
            }
        }
    }
}
