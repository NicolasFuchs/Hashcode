package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Person;
import ch.heiafr.arsi.g6.hashcode.service.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
