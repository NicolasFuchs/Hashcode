package ch.heiafr.arsi.g6.hashcode.service;

import ch.heiafr.arsi.g6.hashcode.model.Person;

import java.util.List;

public interface IPersonService {

  List<Person> findAll();

  Person save(Person person);

  Person delete(Integer personId);
}
