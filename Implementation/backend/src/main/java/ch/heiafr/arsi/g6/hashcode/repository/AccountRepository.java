package ch.heiafr.arsi.g6.hashcode.repository;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

  // Maybe need to be rewritten!
  List<Account> findAllPending();

  // Maybe need to be rewritten!
  // List<Account> findByRole(Role role);

  // Maybe need to be rewritten!
  // List<Account> findAllTeamMembers();

  // Maybe need to be rewritten!
  // List<Account> findOrganizersByPseudo(String pseudo);

  Account findByPseudo(String pseudo);
}
