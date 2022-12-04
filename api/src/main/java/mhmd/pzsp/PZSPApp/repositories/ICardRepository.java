package mhmd.pzsp.PZSPApp.repositories;

import mhmd.pzsp.PZSPApp.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUserId(Long userId);

    List<Card> findByQuestion(String question);
}
