package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer teamId;

  private String name;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "teamId")
  private List<Solution> solutions;

  public Integer getTeamId() {
    return teamId;
  }

  public String getName() {
    return name;
  }

  public List<Solution> getSolutions() {
    return solutions;
  }
}
