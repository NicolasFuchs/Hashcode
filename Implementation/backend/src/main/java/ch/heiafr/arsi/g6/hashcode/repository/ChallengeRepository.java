package ch.heiafr.arsi.g6.hashcode.repository;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@SuppressWarnings("SpringDataMethodInconsistencyInspection")
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

  default List<Challenge> findByBeginBeforeNowAndEndAfterNow() {
    LocalDateTime now = LocalDateTime.now();
    now.format(DateTimeFormatter.ofPattern("yyyy MM dd hh:mm:ss"));
    return findByBeginBeforeAndEndAfter(now, now);
  }

  default List<Challenge> findByEndBeforeNow() {
    LocalDateTime now = LocalDateTime.now();
    now.format(DateTimeFormatter.ofPattern("yyyy MM dd hh:mm:ss"));
    return findByEndBefore(now);
  }

  default List<Challenge> findByBeginAfterNow() {
     LocalDateTime now = LocalDateTime.now();
    now.format(DateTimeFormatter.ofPattern("yyyy MM dd hh:mm:ss"));
    return findByBeginAfter(now);
  }

  List<Challenge> findByBeginBeforeAndEndAfter(LocalDateTime beginDate, LocalDateTime endDate);

  // Maybe need to be rewritten!
  List<Challenge> findByEndBefore(LocalDateTime date);

  // Maybe need to be rewritten!
  List<Challenge> findByBeginAfter(LocalDateTime date);

  // Maybe need to be rewritten!
  // Challenge findActualChallenge();

  // Maybe need to be rewritten!
  // List<LocalDate> findAllDate();

  Challenge getByChallengeId(int Id);
}
