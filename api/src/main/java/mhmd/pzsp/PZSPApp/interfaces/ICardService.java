package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.NewCardRequest;

import java.util.List;

public interface ICardService {
    List<Card> findAllCards();

    List<Card> findCardsByUser(Long userId);

    List<Group> findGroupsByUser(Long userId);

    Card create(NewCardRequest request, User user);
}
