package com.examreg.examreg.models;

import java.util.List;

import com.examreg.examreg.enums.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Admin extends User {

  public Admin() {
    this.setRole(Role.ADMIN);
  }

  @OneToMany(mappedBy = "admin")
  private List<ImportLog> importLogs;

  @OneToMany(mappedBy = "admin")
  private List<Notification> notifications;
}
