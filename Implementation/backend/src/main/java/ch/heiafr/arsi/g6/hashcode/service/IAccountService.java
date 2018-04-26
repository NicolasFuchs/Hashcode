package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.model.Team;

import java.util.List;

public interface IAccountService {

  List<Account> getPending();

  void acceptPending(Account account);

  void refusePending(Account account);

  List<Account> getChallengers(String pseudo);

  List<Account> getOrganizers();

  void deleteAccount(Account account);

  void createAccount(Account account);

  Account getAccount(Integer id);

  void updateAccount(Account account);

  List<Account> getLoggedUsers();

  List<Account> getTeamMembers(Team team);

  List<Account> getOrganizersByPseudo(String pseudo);
}
