package ch.heiafr.arsi.g6.hashcode.model;

import javax.persistence.*;
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

  private LocalDateTime begin;

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

  public void setChallengeId(Integer challengeId) {
    this.challengeId = challengeId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getNbTeams() {
    return nbTeams;
  }

  public void setNbTeams(Integer nbTeams) {
    this.nbTeams = nbTeams;
  }

  public LocalDateTime getInscriptionDate() {
    return inscriptionDate;
  }

  public void setInscriptionDate(LocalDateTime inscriptionDate) {
    this.inscriptionDate = inscriptionDate;
  }

  public LocalDateTime getBegin() {
    return begin;
  }

  public void setBegin(LocalDateTime begin) {
    this.begin = begin;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }

  public String getMediaXml() {
    return mediaXml;
  }

  public void setMediaXml(String mediaXml) {
    this.mediaXml = mediaXml;
  }

  public List<Account> getOrganizers() {
    return organizers;
  }

  public void setOrganizers(List<Account> organizers) {
    this.organizers = organizers;
  }

  public List<Team> getParticipants() {
    return participants;
  }

  public void setParticipants(List<Team> participants) {
    this.participants = participants;
  }
}
