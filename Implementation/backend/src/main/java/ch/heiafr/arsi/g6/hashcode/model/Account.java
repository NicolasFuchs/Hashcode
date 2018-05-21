package ch.heiafr.arsi.g6.hashcode.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer accountId;

  private String firstname;

  private String lastname;

  private String email;

  private String pseudo;

  @JsonIgnore private String password;

  @JsonIgnore private String token;

  private String image;

  @ManyToOne
  @JoinColumn(name = "roleId")
  private Role role;

  public Integer getAccountId() {
    return accountId;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public String getEmail() {
    return email;
  }

  public String getPseudo() {
    return pseudo;
  }

  public String getPassword() {
    return password;
  }

  public String getToken() {
    return token;
  }

  public String getImage() {
    return image;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
