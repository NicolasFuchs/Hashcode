package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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
