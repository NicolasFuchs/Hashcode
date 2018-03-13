package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Person;
import ch.heiafr.arsi.g6.hashcode.service.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {

  private IPersonService personService;

  @Autowired
  public PersonController(IPersonService personService) {
    this.personService = personService;
  }

  @CrossOrigin
  @GetMapping
  public List<Person> findAll() {
    return personService.findAll();
  }

  @CrossOrigin
  @PostMapping
  public Person create(@RequestBody Person person) {
    return personService.save(person);
  }

  @CrossOrigin
  @PutMapping
  public Person update(@RequestBody Person person) {
    return personService.save(person);
  }

  @CrossOrigin
  @DeleteMapping("/{id}")
  public Person delete(@PathVariable("id") Integer personId) {
    return personService.delete(personId);
  }
}
