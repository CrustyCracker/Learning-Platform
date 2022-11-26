package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.User;

import java.util.List;

public interface ICardService {
    List<Card> findByUser(User user);

    List<Card> findAll();
}
