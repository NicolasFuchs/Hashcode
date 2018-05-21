package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.constante.RoleConst;
import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Role;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.repository.AccountRepository;
import ch.heiafr.arsi.g6.hashcode.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {

  private final AccountRepository accountRepository;

  @Autowired
  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public List<Account> getPending() {
    // Must be implanted!
    return null;
  }

  @Override
  public void acceptPending(Account account) {
    // Must be implanted!
  }

// J'utilise plutôt refusePending avec un ID
  @Override
  public void refusePending(Account account) {

    // Must be implanted!
  }

  @Override
  public List<Account> getChallengers(String pseudo) {
    // Must be implanted!
    return null;
  }

  @Override
  public List<Account> getOrganizers() {
    // Must be implanted!
    return null;
  }

  @Override
  public void deleteAccount(Account account) {

  }

  @Override
  public void createAccount(Account account) {
    // Must be implanted!
  }

  @Override
  public Account getAccount(Integer id) {
    // Must be implanted!
    return accountRepository.findByAccountId(id);
  }

  @Override
  public Account getAccountByPseudo(String pseudo) {
    return accountRepository.findByPseudo(pseudo);
  }

  @Override
  public void updateAccount(Account account) {
    // Must be implanted!
  }

  @Override
  public List<Account> getLoggedUsers() {
    // Must be implanted!
    return accountRepository.findAll();
    //return null;
  }

  @Override
  public List<Account> getTeamMembers(Team team) {
    // Must be implanted!
    return null;
  }

  @Override
  public List<Account> getOrganizersByPseudo(String pseudo) {
    // Must be implanted!
    return null;
  }

  @Override
  public List<Account> getAccountsByRole(Role role) {
    return accountRepository.findAllByRole(role);
  }

  @Override
  public Account refusePending(int id) {
    Account accountToDel = accountRepository.findByAccountId(id);
    if(accountToDel==null){
      // Retourner une information (déjà supprimer
    }else{
      if(accountToDel.getRole().equals(RoleConst.VALIDATED_ORGANIZER)){
        // Account déjà été valider par quelqu'un d'autre
      }else{
        return accountRepository.deleteById(id);
      }
    }
  return null;
  }
}
