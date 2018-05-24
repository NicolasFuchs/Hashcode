package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Role;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.model.Token;

import java.util.List;

public interface IAccountService {

  List<Account> getPending();

  void acceptPending(Account account);

  void refusePending(Account account);

  List<Account> getOrganizers();

  void deleteAccount(Account account);

  Account createAccount(Account account);

  Account getAccount(Integer id);

  Account getAccountByPseudo(String pseudo);

  void updateAccount(Account account);

  List<Account> getLoggedUsers();

  List<Account> getTeamMembers(Team team);

  List<Account> getAccountsByRole(Role role);

  Account refusePending(int id);

  String generateToken(Account account);

  void validate(Token token);
}
