package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.model.Person;
import ch.heiafr.arsi.g6.hashcode.repository.PersonRepository;
import ch.heiafr.arsi.g6.hashcode.service.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService implements IPersonService {

  private final PersonRepository personRepository;

  @Autowired
  public PersonService(PersonRepository personRepository) {
    this.personRepository = personRepository;
  }

  @Override
  public List<Person> findAll() {
    return personRepository.findAll();
  }

  @Override
  public Person save(Person person) {
    return personRepository.save(person);
  }
}
