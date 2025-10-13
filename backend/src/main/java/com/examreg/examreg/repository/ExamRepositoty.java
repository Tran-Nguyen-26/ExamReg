package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Exam;

public interface ExamRepositoty extends JpaRepository<Exam, Long> {

}
