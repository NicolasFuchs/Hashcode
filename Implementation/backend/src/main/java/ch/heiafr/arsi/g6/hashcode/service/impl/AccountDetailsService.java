package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AccountDetailsService implements UserDetailsService {

  private final AccountRepository accountRepository;

  @Autowired
  public AccountDetailsService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String pseudo) throws UsernameNotFoundException {
    Account account = accountRepository.findByPseudo(pseudo);
    if (account == null) {
      throw new UsernameNotFoundException(pseudo);
    }
    return new User(
        account.getPseudo(), account.getPassword(), Collections.singletonList(account.getRole()));
  }
}
