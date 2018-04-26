package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

  private IAccountService accountService;

  @Autowired
  public AccountController(IAccountService accountService) {
    this.accountService = accountService;
  }

  public List<Account> getPending() {
    // Must be implanted!
    return null;
  }

  public void acceptPending(Account account) {
    // Must be implanted!
  }

  public void refusePending(Account account) {
    // Must be implanted!
  }

  public List<Account> getChallengers(String pseudo) {
    // Must be implanted!
    return null;
  }

  public List<Account> getOrganizers() {
    // Must be implanted!
    return null;
  }

  public void deleteAccount(Account account) {
    // Must be implanted!
  }

  public void createAccount(Account account) {
    // Must be implanted!
  }

  public Account getAccount(Integer id) {
    // Must be implanted!
    return null;
  }

  public void updateAccount(Account account) {
    // Must be implanted!
  }

  public List<Account> getLoggedUsers() {
    // Must be implanted!
    return null;
  }

  public List<Account> getTeamMembers(Team team) {
    // Must be implanted!
    return null;
  }

  public List<Account> getOrganizersByPseudo(String pseudo) {
    // Must be implanted!
    return null;
  }
}
