package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.repository.TeamRepository;
import ch.heiafr.arsi.g6.hashcode.service.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService implements ITeamService {

  private final TeamRepository teamRepository;

  @Autowired
  public TeamService(TeamRepository teamRepository) {
    this.teamRepository = teamRepository;
  }

  @Override
  public void updateTeam(Team team) {
    // Must be implanted!
  }

  @Override
  public Boolean isTeamNameExisting(String name) {
    // Must be implanted!
    return null;
  }

  @Override
  public void createTeam(Team team) {
    // Must be implanted!
  }

  @Override
  public void deleteTeam(Team team) {
    // Must be implanted!
  }
}
