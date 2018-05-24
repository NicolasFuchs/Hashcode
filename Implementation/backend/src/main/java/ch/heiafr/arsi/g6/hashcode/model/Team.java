package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer teamId;

  private String name;

  public Integer getTeamId() {
    return teamId;
  }

  public String getName() {
    return name;
  }

/*

  @ManyToMany
  @JoinTable(
          name = "account_team",
          joinColumns = @JoinColumn(name = "teamId", referencedColumnName = "teamId"),
          inverseJoinColumns = @JoinColumn(name = "accountId", referencedColumnName = "accountId")
  )
  private List<Account> challenger;
 */

}
