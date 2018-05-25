package ch.heiafr.arsi.g6.hashcode.repository;

import ch.heiafr.arsi.g6.hashcode.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, Integer> {

  // Maybe need to be rewritten!
  // List<Solution> findByTeam(Team team);

  //
    //
    // List<Solution> findByTeamId(int teamId);

    Solution save(Solution solution);
}
