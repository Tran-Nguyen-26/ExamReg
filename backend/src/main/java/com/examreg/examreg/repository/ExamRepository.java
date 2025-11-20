package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {

}
