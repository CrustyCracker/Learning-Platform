package mhmd.pzsp.PZSPApp.repositories;

import mhmd.pzsp.PZSPApp.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByUserId(Long userId);
}
