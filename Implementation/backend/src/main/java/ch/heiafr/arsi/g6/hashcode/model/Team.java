package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
}
