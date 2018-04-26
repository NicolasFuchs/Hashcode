package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;
import ch.heiafr.arsi.g6.hashcode.service.IChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

  private IChallengeService challengeService;

  @Autowired
  public ChallengeController(IChallengeService challengeService) {
    this.challengeService = challengeService;
  }

  public List<Challenge> getPastChallenges() {
    // Must be implanted!
    return null;
  }

  public List<Challenge> getFutureChallenges() {
    // Must be implanted!
    return null;
  }

  public Challenge getChallenge(Integer id) {
    // Must be implanted!
    return null;
  }

  public List<LocalDate> getChallengesDates() {
    // Must be implanted!
    return null;
  }

  public void createChallenge(Challenge challenge) {
    // Must be implanted!
  }

  public void deleteChallenge(Challenge challenge) {
    // Must be implanted!
  }
}
