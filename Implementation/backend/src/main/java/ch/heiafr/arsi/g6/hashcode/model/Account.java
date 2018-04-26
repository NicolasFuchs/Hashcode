package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer accountId;

  private String firstname;

  private String lastname;

  private LocalDate birthday;

  private String email;

  private String password;

  private String token;

  private String image;
}
