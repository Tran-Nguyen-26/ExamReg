package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

}
