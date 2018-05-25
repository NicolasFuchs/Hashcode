package ch.heiafr.arsi.g6.hashcode.model;

import ch.heiafr.arsi.g6.hashcode.serializer.MembersSerializer;
import ch.heiafr.arsi.g6.hashcode.serializer.OnlyAccountIdSerializer;
import ch.heiafr.arsi.g6.hashcode.serializer.OnlyChallengeIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.List;

@Entity
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer teamId;

  private String name;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "challengeId")
  @JsonSerialize(using = OnlyChallengeIdSerializer.class)
  private Challenge challenge;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "teamId")
  private List<Solution> solutions;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "leaderId")
  @JsonSerialize(using = OnlyAccountIdSerializer.class)
  private Account leader;

  @ManyToMany(mappedBy = "teams")
  @JsonSerialize(using = MembersSerializer.class)
  private List<Account> members;

  public Integer getTeamId() {
    return teamId;
  }

  public void setTeamId(Integer teamId) {
    this.teamId = teamId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Challenge getChallenge() {
    return challenge;
  }

  public void setChallenge(Challenge challenge) {
    this.challenge = challenge;
  }

  public Account getLeader() {
    return leader;
  }

  public void setLeader(Account leader) {
    this.leader = leader;
  }

  public List<Solution> getSolutions() {
    return solutions;
  }

  public void setSolutions(List<Solution> solutions) {
    this.solutions = solutions;
  }

  public List<Account> getMembers() {
    return members;
  }

  public void setMembers(List<Account> members) {
    this.members = members;
  }
}
