package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Team;

public interface ITeamService {

  void updateTeam(Team team);

  Boolean isTeamNameExisting(String name);

  void createTeam(Team team);

  void deleteTeam(Team team);
}
