package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Solution {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer solutionId;

  private String name;

  private String language;

  private String solution;

  private Float version;

  private Float ranking;

  private LocalDateTime submitDate;

  public Integer getSolutionId() {
    return solutionId;
  }

  public String getName() {
    return name;
  }

  public String getLanguage() {
    return language;
  }

  public String getSolution() {
    return solution;
  }

  public Float getVersion() {
    return version;
  }

  public Float getRanking() {
    return ranking;
  }

  public LocalDateTime getSubmitDate() {
    return submitDate;
  }
}
