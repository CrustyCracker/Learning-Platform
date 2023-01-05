package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.EditCardRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;

import java.util.List;

public interface ICardService {
    List<Card> findAllCards();

    List<Card> findPublicOrUsers(Long userId);

    List<Card> findCardsByUser(Long userId);

    Card findCardById(Long cardId) throws BackendException;

    Card create(NewCardRequest request, User user) throws BackendException;

    List<Card> findCardsByGroupsId(Long groupId);

    boolean delete(Long cardId) throws BackendException;

    Card edit(EditCardRequest request, User user) throws BackendException;
}
