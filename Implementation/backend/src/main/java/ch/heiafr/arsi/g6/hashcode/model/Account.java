package ch.heiafr.arsi.g6.hashcode.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
@NamedStoredProcedureQueries({
  @NamedStoredProcedureQuery(
    name = "generate_token",
    procedureName = "generate_token",
    parameters = {
      @StoredProcedureParameter(mode = ParameterMode.IN, name = "accountId", type = Integer.class),
      @StoredProcedureParameter(mode = ParameterMode.OUT, name = "token", type = String.class)
    }
  ),
})
public class Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer accountId;

  private String firstname;

  private String lastname;

  private String email;

  private String pseudo;

  private String password;

  @JsonIgnore private String token;

  private String image;

  @ManyToOne
  @JoinColumn(name = "roleId")
  private Role role;

  @ManyToMany
  @JoinTable(
    name = "account_team",
    joinColumns = @JoinColumn(name = "accountId"),
    inverseJoinColumns = @JoinColumn(name = "teamId")
  )
  private List<Team> teams;

  public Integer getAccountId() {
    return accountId;
  }

  public void setAccountId(Integer accountId) {
    this.accountId = accountId;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPseudo() {
    return pseudo;
  }

  public void setPseudo(String pseudo) {
    this.pseudo = pseudo;
  }

  @JsonIgnore
  public String getPassword() {
    return password;
  }

  @JsonProperty
  public void setPassword(String password) {
    this.password = password;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public List<Team> getTeams() {
    return teams;
  }

  public void setTeams(List<Team> teams) {
    this.teams = teams;
  }
}
