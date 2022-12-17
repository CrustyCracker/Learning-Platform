package mhmd.pzsp.PZSPApp.repositories;

import mhmd.pzsp.PZSPApp.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ICardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUserId(Long userId);

    List<Card> findByQuestion(String question);

    List<Card> findByIdIn(Collection<Long> ids);

    @Query("select c from Card c where c.user.id in ?1 or c.isPublic in ?2")
    List<Card> findByUserIdOrPublic(Long userId, boolean isPublic);

    Card findCardById(Long cardId);

    List<Card> findCardsByGroupsId(Long groupId);
}
