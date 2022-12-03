package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.interfaces.ICardService;
import mhmd.pzsp.PZSPApp.models.Card;
import mhmd.pzsp.PZSPApp.repositories.ICardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService implements ICardService {
    @Autowired
    private ICardRepository cardRepository;

    @Override
    public List<Card> findAll(){
        return cardRepository.findAll();
    }
}
