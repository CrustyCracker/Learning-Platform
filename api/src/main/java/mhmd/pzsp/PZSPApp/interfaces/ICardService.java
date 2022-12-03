package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.models.Card;
import java.util.List;

public interface ICardService {
    //pzsp2 porozszerzać ten serwis
    List<Card> findAll();
}
