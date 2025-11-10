package com.examreg.examreg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
  Optional<Student> findByEmail(String email);
}
