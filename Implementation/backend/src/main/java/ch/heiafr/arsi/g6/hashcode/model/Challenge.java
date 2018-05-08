package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

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

  private String mediaXml;

  @ManyToMany
  @JoinTable(
    name = "challenge_account",
    joinColumns = @JoinColumn(name = "challengeId", referencedColumnName = "challengeId"),
    inverseJoinColumns = @JoinColumn(name = "accountId", referencedColumnName = "accountId")
  )
  private List<Account> organizers;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "challengeId")
  private List<Team> participants;

  public Integer getChallengeId() {
    return challengeId;
  }

  public String getName() {
    return name;
  }

  public Integer getNbTeams() {
    return nbTeams;
  }

  public LocalDate getInscriptionDate() {
    return inscriptionDate;
  }

  public LocalDate getBegin() {
    return begin;
  }

  public LocalDate getEnd() {
    return end;
  }

  public String getMediaXml() {
    return mediaXml;
  }

  public List<Account> getOrganizers() {
    return organizers;
  }

  public List<Team> getParticipants() {
    return participants;
  }
}
