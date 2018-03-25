package ch.heiafr.arsi.g6.hashcode.service.impl;

import ch.heiafr.arsi.g6.hashcode.helper.XSDValidatorHelper;
import ch.heiafr.arsi.g6.hashcode.model.Person;
import ch.heiafr.arsi.g6.hashcode.repository.PersonRepository;
import ch.heiafr.arsi.g6.hashcode.service.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    XSDValidatorHelper.validateXML(person.getAddressXML());
    return personRepository.save(person);
  }

  @Override
  public Person delete(Integer personId) {
    Person person = null;
    Optional<Person> res = personRepository.findById(personId);
    if (res.isPresent()) person = res.get();
    personRepository.deleteById(personId);
    return person;
  }
}
