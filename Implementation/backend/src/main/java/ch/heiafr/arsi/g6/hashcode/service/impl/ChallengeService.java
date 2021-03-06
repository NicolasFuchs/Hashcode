package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;
import ch.heiafr.arsi.g6.hashcode.repository.ChallengeRepository;
import ch.heiafr.arsi.g6.hashcode.service.IChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ChallengeService implements IChallengeService {

  private final ChallengeRepository challengeRepository;

  @Autowired
  public ChallengeService(ChallengeRepository challengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  @Override
  public Challenge getActualChallenge() {
    List<Challenge> actual = challengeRepository.findByBeginBeforeNowAndEndAfterNow();
    return actual.size() > 0 ? actual.get(0) : null;
  }

  @Override
  public List<Challenge> getPastChallenges() {
    // Must be implanted!
    List<Challenge> past = challengeRepository.findByEndBeforeNow();
    return past;
  }

  @Override
  public List<Challenge> getFutureChallenges() {
    List<Challenge> future = challengeRepository.findByBeginAfterNow();
    return future;
  }

  @Override
  public Challenge getChallenge(Integer id) {
    // Must be implanted!
    return challengeRepository.getByChallengeId(id);
  }

  @Override
  public List<LocalDate> getChallengesDates() {
    // Must be implanted!
    return null;
  }

  @Override
  public void createChallenge(Challenge challenge) {
    // Must be implanted!
  }

  @Override
  public void deleteChallenge(Challenge challenge) {
    // Must be implanted!
  }

}
