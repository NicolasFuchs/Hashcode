package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import ch.heiafr.arsi.g6.hashcode.service.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService implements IEmailService {

  private static final String BASE_URL = "http://localhost:4200/";

  private final JavaMailSender javaMailSender;
  private final TemplateEngine templateEngine;

  @Autowired
  public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
    this.javaMailSender = javaMailSender;
    this.templateEngine = templateEngine;
  }

  @Override
  public void sendVerificationEmail(Account account) {
    Context context = new Context();
    context.setVariable("name", "Hello " + account.getFirstname() + " " + account.getLastname() + " !");
    context.setVariable("validationHash", BASE_URL + "validation/" + "aksdjhfalkjsdakjhdslfkja");
    String content = templateEngine.process("EmailAccountValidation", context);
    MimeMessagePreparator messagePreparator =
        mimeMessage -> {
          MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
          messageHelper.setFrom("Hashcode G6 <hashcode.g6@gmail.com>");
          messageHelper.setTo(account.getEmail());
          messageHelper.setSubject("Validation de votre compte Hashcode");
          messageHelper.setText(content, true);
        };
    javaMailSender.send(messagePreparator);
  }
}
