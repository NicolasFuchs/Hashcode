package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Solution {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer solutionId;

  private String name;

  private String description;

  private String language;

  private Float version;

  private Integer ranking;

  private LocalDateTime submitDate;
}
