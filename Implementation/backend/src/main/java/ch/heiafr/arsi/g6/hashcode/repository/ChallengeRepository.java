package ch.heiafr.arsi.g6.hashcode.repository;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

  // Maybe need to be rewritten!
  // List<Challenge> findByEndBefore(LocalDate date);

  // Maybe need to be rewritten!
  // List<Challenge> findByBeginAfter(LocalDate date);

  // Maybe need to be rewritten!
  // Challenge findActualChallenge();

  // Maybe need to be rewritten!
  // List<LocalDate> findAllDate();
}
