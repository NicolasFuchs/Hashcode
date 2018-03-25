package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Person {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer personId;

  private String firstname;

  private String lastname;

  private LocalDate birthday;

  private String addressXML;

  public Integer getPersonId() {
    return personId;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public LocalDate getBirthday() {
    return birthday;
  }

  public String getAddressXML() {
    return addressXML;
  }
}
