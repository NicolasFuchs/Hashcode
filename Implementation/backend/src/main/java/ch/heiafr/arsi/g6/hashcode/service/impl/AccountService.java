package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.Exception.AccountException;
import ch.heiafr.arsi.g6.hashcode.constant.Roles;
import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Role;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.repository.AccountRepository;
import ch.heiafr.arsi.g6.hashcode.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {

  private final AccountRepository accountRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
    this.accountRepository = accountRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public List<Account> getPending() {
    // Must be implanted!
    return null;
  }

  @Override
  public void acceptPending(Account account) {
   Account newAcc = getAccount(account.getAccountId());
    if(newAcc == null){
      throw new AccountException("C-03", "La demande de validation du compte à déjà été refusé");
    }else if(newAcc.getRole().getRoleId() == Roles.VALIDATED_ORGANIZER.getRoleId()){
      throw new AccountException("C-04", "La demande de validation du compte à déjà été validé par quelqu'un d'autre");
    }else{
      newAcc.setRole(Roles.VALIDATED_ORGANIZER);
      accountRepository.save(newAcc);
    }
  }

  // J'utilise plutôt refusePending avec un ID
  @Override
  public void refusePending(Account account) {

    // Must be implanted!
  }

  @Override
  public List<Account> getOrganizers() {
    // Must be implanted!
    return null;
  }

  @Override
  public void deleteAccount(Account account) {}

  @Override
  public void createAccount(Account account) {
    account.setPassword(passwordEncoder.encode(account.getPassword()));
    accountRepository.save(account);
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
    if (account.getPassword() == null) {
      Account passwordRetriever = accountRepository.findByAccountId(account.getAccountId());
      account.setPassword(passwordRetriever.getPassword());
    } else {
      account.setPassword(passwordEncoder.encode(account.getPassword()));
    }
    accountRepository.save(account);
  }

  @Override
  public List<Account> getLoggedUsers() {
    // Must be implanted!
    return accountRepository.findAll();
    // return null;
  }

  @Override
  public List<Account> getTeamMembers(Team team) {
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
      throw new AccountException("C-01", "La demande de validation du compte à déjà été refusé");
    }else{
      if(accountToDel.getRole().getRoleId() == Roles.VALIDATED_ORGANIZER.getRoleId()){
        // Account déjà été valider par quelqu'un d'autre
        throw new AccountException("C-02", "La demande de validation du compte à déjà été validé par quelqu'un d'autre");
      }else{
        return accountRepository.deleteById(id);
      }
    }
  }
}