package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Challenge {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer challengeId;

  private String name;

  private Integer nbTeams;

  private LocalDate inscriptionDate;

  private LocalDate begin;

  private LocalDate end;

  private String mediaXML;
}
