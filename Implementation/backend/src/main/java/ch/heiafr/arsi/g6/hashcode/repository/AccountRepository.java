package ch.heiafr.arsi.g6.hashcode.repository;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    // Maybe need to be rewritten!
    List<Account> findAllPending();

    // Maybe need to be rewritten!
    List<Account> findByRole(Role role);

    // Maybe need to be rewritten!
    List<Account> findAllTeamMembers();

    // Maybe need to be rewritten!
    List<Account> findOrganizersByPseudo(String pseudo);

    // Maybe need to be rewritten!
    Account findByPseudo(String pseudo);
}
