package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Account;

public interface IEmailService {

  void sendVerificationEmail(Account account);
}
