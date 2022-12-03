package mhmd.pzsp.PZSPApp.repositories;

import mhmd.pzsp.PZSPApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}
