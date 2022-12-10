package mhmd.pzsp.PZSPApp.repositories;

import mhmd.pzsp.PZSPApp.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ITagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByUserId(Long userId);

    Optional<Tag> findByName(String name);

    Optional<Tag> findById(Long id);

    List<Tag> findByIdIn(Collection<Long> ids);
}
