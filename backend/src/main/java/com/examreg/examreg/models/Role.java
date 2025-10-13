package com.examreg.examreg.models;

import java.util.List;

import com.examreg.examreg.enums.RoleName;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  private RoleName roleName;

  @OneToMany(mappedBy = "role")
  private List<Admin> admins;

  @OneToMany(mappedBy = "role")
  private List<Student> students;
}
