package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.constante.RoleConst;
import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.service.IAccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

  private final IAccountService accountService;

  @Autowired
  public AccountController(IAccountService accountService) {
    this.accountService = accountService;
  }

  public List<Account> getPending() {
    //return accountService.getPending();
    return null;
  }

  @GetMapping("/organizerpending")
  public List<Account> getOrganizerPending() {
    return accountService.getAccountsByRole(RoleConst.PENDING_ORGANIZER);
  }

  public void acceptPending(Account account) {
    // Must be implanted!
  }

  @DeleteMapping("/{id}")
  public Account refusePending(@PathVariable int id) {
    return accountService.refusePending(id);
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

  @GetMapping("/{id}")
  public Account getAccount(@PathVariable int id) {
    return accountService.getAccount(id);
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
