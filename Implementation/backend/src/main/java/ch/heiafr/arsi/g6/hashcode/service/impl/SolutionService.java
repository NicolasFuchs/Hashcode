package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Solution;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.repository.SolutionRepository;
import ch.heiafr.arsi.g6.hashcode.service.ISolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolutionService implements ISolutionService {

  private final SolutionRepository solutionRepository;

  @Autowired
  public SolutionService(SolutionRepository solutionRepository) {
    this.solutionRepository = solutionRepository;
  }

  @Override
  public List<Solution> getSolutions(Team team) {
    // Must be implanted!
    /*int teamID = team.getTeamId();
    List<Solution> solutions = solutionRepository.findByTeamId(teamID);
    return solutions;*/
    return null;
  }

  @Override
  public void createSolution(Solution solution) {
    // Must be implanted!
  }

  @Override
  public void updateSolution(Solution solution) {
    // Must be implanted!
  }
}
