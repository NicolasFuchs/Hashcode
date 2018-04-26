package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Solution;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.service.ISolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/solutions")
public class SolutionController {

  private final ISolutionService solutionService;

  @Autowired
  public SolutionController(ISolutionService solutionService) {
    this.solutionService = solutionService;
  }

  public List<Solution> getSolutions(Team team) {
    // Must be implanted!
    return null;
  }

  public void createSolution(Solution solution) {
    // Must be implanted!
  }

  public void updateSolution(Solution solution) {
    // Must be implanted!
  }
}
