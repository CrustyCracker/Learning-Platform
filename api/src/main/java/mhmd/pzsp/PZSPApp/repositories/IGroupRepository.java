package mhmd.pzsp.PZSPApp.repositories;

import mhmd.pzsp.PZSPApp.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface IGroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByUserId(Long userId);

    List<Group> findByName(String name);

    List<Group> findByIdIn(Collection<Long> ids);

    Group findGroupById(Long groupId);

    @Query("select g from Group g where g.user.id in ?1 or g.visibility in ?2")
    List<Group> findByUserIdOrPublic(Long userId, Character visibility);
}
