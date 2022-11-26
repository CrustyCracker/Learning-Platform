package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.models.User;

import java.util.List;

public interface ICardService {
    //pzsp2 porozszerzać ten serwis
    List<Card> findByUser(User user);

    List<Card> findAll();
}
