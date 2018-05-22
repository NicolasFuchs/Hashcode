package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  private final IAccountService accountService;

  @Autowired
  public AuthenticationController(IAccountService accountService) {
    this.accountService = accountService;
  }

  @GetMapping("/login")
  // @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_VALIDATED_ORGANIZER') or
  // hasRole('ROLE_VALIDATED_USER')")
  public Account login(HttpSession session) {
    SecurityContext securityContext =
        (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
    User user = (User) securityContext.getAuthentication().getPrincipal();
    return accountService.getAccountByPseudo(user.getUsername());
  }

  @GetMapping("/logout")
  @PreAuthorize("isAuthenticated()")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void logout(HttpSession session) {
    session.invalidate();
  }
}
