package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.service.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teams")
public class TeamController {

  private final ITeamService teamService;

  @Autowired
  public TeamController(ITeamService teamService) {
    this.teamService = teamService;
  }

  public void updateTeam(Team team) {
    // Must be implanted!
  }

  public Boolean isTeamNameExisting(String name) {
    // Must be implanted!
    return null;
  }

  public void createTeam(Team team) {
    // Must be implanted!
  }

  public void deleteTeam(Team team) {
    // Must be implanted!
  }
}