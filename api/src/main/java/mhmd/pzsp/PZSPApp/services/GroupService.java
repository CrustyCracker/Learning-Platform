package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
import mhmd.pzsp.PZSPApp.interfaces.IGroupService;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.EditGroupRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import mhmd.pzsp.PZSPApp.repositories.IGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;

@Service
public class GroupService implements IGroupService {
    @Autowired
    private IGroupRepository groupRepository;
    @Autowired
    private ICardRepository cardRepository;

    @Override
    public Group create(NewGroupRequest request, User user) throws BackendException, BackendSqlException {
        var group = createGroup(request, user);
        try {
            return groupRepository.save(group);
        }
        catch (Exception e) {
            throw new BackendSqlException("Błąd podczas zapisywania grupy");
        }
    }

    @Override
    public List<Group> findGroupsByUser(Long userId) {
        return groupRepository.findByUserId(userId);
    }

    @Override
    public Group findGroupById(Long groupId) throws BackendException {
        var group = groupRepository.findGroupById(groupId);
        if (group == null)
            return null;

        if (group.isPublic() || Objects.requireNonNull(getCurrentUser()).isAdmin() ||
                Objects.equals(group.getUser().getId(), Objects.requireNonNull(getCurrentUser()).getId()))
            return group;

        throw new BackendException(String.format("Nie masz uprawień do grupy %d", group.getId()));
    }

    @Override
    public List<Group> findPublicOrUsers(Long userId) {
        return groupRepository.findByUserIdOrPublic(userId, 'G');
    }

    @Override
    public Group edit(EditGroupRequest request, User user) throws BackendException, BackendSqlException {
        if (request.id == null)
            throw new BackendException("Nie podano id edytowanej fiszki");

        var editedGroup = groupRepository.findGroupById(request.id);

        if (!editedGroup.getUser().getId().equals(user.getId()) && !user.isAdmin())
            throw new BackendException("Nie masz uprawnień do edycji tej grupy");

        var group = createGroup(request, user);
        group.setId(editedGroup.getId());

        try {
            return groupRepository.save(group);
        }
        catch (Exception e) {
            throw new BackendSqlException("Błąd podczas zapisywania grupy");
        }
    }

    @Override
    public boolean delete(Long groupId) throws BackendException {
        if (groupId == null)
            throw new BackendException("Nie podano id");
        if (groupRepository.existsById(groupId)) {
            var group = groupRepository.findGroupById(groupId);

            if (Objects.equals(group.getUser().getId(), Objects.requireNonNull(getCurrentUser()).getId())
                    || getCurrentUser().isAdmin()) {

                groupRepository.deleteById(groupId);
                return true;
            }
            throw new BackendException("Nie można usunąć grupy innego użytkownika");
        }
        throw new BackendException("Nie istnieje grupa o podanym id");
    }

    private Group createGroup(NewGroupRequest request, User user) throws BackendException {
        if (request.name == null || request.name.isBlank())
            throw new BackendException("Nie podano nazwy");

        if (request.difficulty == null)
            throw new BackendException("Nie podano trudności");

        List<Card> cards = new ArrayList<>();

        if (request.cardIds != null && !request.cardIds.isEmpty())
            cards = cardRepository.findByIdIn(request.cardIds);

        if (request.isPublic)
            for (var card : cards)
                if (!card.IsPublic())
                    throw new BackendException("Próba utworzenia publicznej grupy z prywatną fiszką");

        return new Group(request, user, cards);
    }
}
