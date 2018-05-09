package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Account;
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
    List<Account> allPending = accountRepository.findAllPending();
    return null;
  }

  @Override
  public void acceptPending(Account account) {
    // Must be implanted!
  }

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
    // Must be implanted!
  }

  @Override
  public void createAccount(Account account) {
    // Must be implanted!
  }

  @Override
  public Account getAccount(Integer id) {
    // Must be implanted!
    return null;
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
    return null;
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
}
