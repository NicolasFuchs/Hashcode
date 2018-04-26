package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;

import java.time.LocalDate;
import java.util.List;

public interface IChallengeService {

  List<Challenge> getPastChallenges();

  List<Challenge> getFutureChallenges();

  Challenge getChallenge(Integer id);

  List<LocalDate> getChallengesDates();

  void createChallenge(Challenge challenge);

  void deleteChallenge(Challenge challenge);
}
