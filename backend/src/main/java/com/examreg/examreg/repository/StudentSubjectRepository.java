package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.StudentSubject;

public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {

}
