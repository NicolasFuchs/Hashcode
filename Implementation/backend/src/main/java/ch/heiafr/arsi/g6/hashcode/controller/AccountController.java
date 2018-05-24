package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.constant.Roles;
import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.model.Token;
import ch.heiafr.arsi.g6.hashcode.service.IAccountService;
import ch.heiafr.arsi.g6.hashcode.service.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

  private final IAccountService accountService;
  private final IEmailService emailService;

  @Autowired
  public AccountController(IAccountService accountService, IEmailService emailService) {
    this.accountService = accountService;
    this.emailService = emailService;
  }

  public List<Account> getPending() {
    // return accountService.getPending();
    return null;
  }

  @GetMapping("/organizerpending")
  public List<Account> getOrganizerPending() {
    return accountService.getAccountsByRole(Roles.PENDING_ORGANIZER);
  }

  @PutMapping
  public void acceptPending(@RequestBody Account account) {
    accountService.acceptPending(account);
  }

  @DeleteMapping("/{id}")
  public Account refusePending(@PathVariable int id) {
    return accountService.refusePending(id);
  }

  @GetMapping("/pseudo")
  public Account getAccountByPseudo(String pseudo) {
    return accountService.getAccountByPseudo(pseudo);
  }

  public List<Account> getOrganizers() {
    // Must be implanted!
    return null;
  }

  public void deleteAccount(Account account) {
    // Must be implanted!
  }

  @PutMapping("/signup")
  public void createAccount(@RequestBody Account account) {
    account = accountService.createAccount(account);
    account.setToken(accountService.generateToken(account));
    emailService.sendVerificationEmail(account);
  }

  @PutMapping("/validate")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
  public void validate(@RequestBody Token token) {
    accountService.validate(token);
  }

  @GetMapping("/{id}")
  public Account getAccount(@PathVariable int id) {
    return accountService.getAccount(id);
  }

  @PutMapping("/profileUpdate")
  public void updateAccount(@RequestBody Account account) {
    accountService.updateAccount(account);
  }

  @GetMapping("/all")
  public List<Account> getLoggedUsers() {
    return accountService.getLoggedUsers();
    // Must be implanted!
    // return null;
  }

  public List<Account> getTeamMembers(Team team) {
    // Must be implanted!
    return null;
  }
}
