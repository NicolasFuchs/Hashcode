package ch.heiafr.arsi.g6.hashcode.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role implements GrantedAuthority {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer roleId;

  private String name;

  public Integer getRoleId() {
    return roleId;
  }

  public String getName() {
    return name;
  }

  @Override
  public String getAuthority() {
    return name;
  }
}
