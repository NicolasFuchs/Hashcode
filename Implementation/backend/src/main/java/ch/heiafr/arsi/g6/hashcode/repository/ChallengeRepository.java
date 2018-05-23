package ch.heiafr.arsi.g6.hashcode.repository;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

@SuppressWarnings("SpringDataMethodInconsistencyInspection")
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

  default List<Challenge> findByBeginBeforeNowAndEndAfterNow() {
    LocalDate now = LocalDate.now();
    return findByBeginBeforeAndEndAfter(now, now);
  }

  default List<Challenge> findByEndBeforeNow() {
    LocalDate now = LocalDate.now();
    return findByEndBefore(now);
  }

  default List<Challenge> findByBeginAfterNow() {
    LocalDate now = LocalDate.now();
    return findByBeginAfter(now);
  }

  List<Challenge> findByBeginBeforeAndEndAfter(LocalDate beginDate, LocalDate endDate);

  // Maybe need to be rewritten!
  List<Challenge> findByEndBefore(LocalDate date);

  // Maybe need to be rewritten!
  List<Challenge> findByBeginAfter(LocalDate date);

  // Maybe need to be rewritten!
  // Challenge findActualChallenge();

  // Maybe need to be rewritten!
  // List<LocalDate> findAllDate();

  Challenge getByChallengeId(int Id);
}
