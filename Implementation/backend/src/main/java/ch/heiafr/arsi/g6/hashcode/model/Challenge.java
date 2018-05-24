package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Challenge {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer challengeId;

  private String name;

  private Integer nbTeams;

  private LocalDateTime inscriptionDate;

  private LocalDateTime  begin;

  private LocalDateTime end;

  private String mediaXml;

  @ManyToMany
  @JoinTable(
    name = "challenge_account",
    joinColumns = @JoinColumn(name = "challengeId"),
    inverseJoinColumns = @JoinColumn(name = "accountId")
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

  public LocalDateTime getInscriptionDate() {
    return inscriptionDate;
  }

  public LocalDateTime getBegin() {
    return begin;
  }

  public LocalDateTime getEnd() {
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

  public void setInscriptionDate(LocalDateTime inscriptionDate) {
    this.inscriptionDate = inscriptionDate;
  }

  public void setBegin(LocalDateTime begin) {
    this.begin = begin;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }
}
