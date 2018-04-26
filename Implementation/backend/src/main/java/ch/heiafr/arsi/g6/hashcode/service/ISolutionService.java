package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Solution;
import ch.heiafr.arsi.g6.hashcode.model.Team;

import java.util.List;

public interface ISolutionService {

  List<Solution> getSolutions(Team team);

  void createSolution(Solution solution);

  void updateSolution(Solution solution);
}
