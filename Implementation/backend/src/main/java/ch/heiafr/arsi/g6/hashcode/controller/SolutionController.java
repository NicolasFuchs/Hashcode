package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Solution;
import ch.heiafr.arsi.g6.hashcode.model.Team;
import ch.heiafr.arsi.g6.hashcode.service.ISolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solutions")
public class SolutionController {

  public ISolutionService solutionService;

  @Autowired
  public SolutionController(ISolutionService solutionService) {
    this.solutionService = solutionService;
  }

  @GetMapping("/{id}")
  public List<Solution> getSolutionsByTeamId(@PathVariable int id) {
    // Must be implanted!

    return null;
  }

  //
  //
   @GetMapping("/teamSolution")
  public List<Solution> getSolutions(@RequestBody Team team) {
    // Must be implanted!
    //return solutionService.getSolutions(team);
   return null;
  }

  public void createSolution(Solution solution) {
    // Must be implanted!
  }

  public void updateSolution(Solution solution) {
    // Must be implanted!
  }
}
