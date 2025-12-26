package com.examreg.examreg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {

  Optional<Exam> findByExamCode(String examCode);

  Exam findByIsOpenTrue();

  java.util.List<Exam> findAllByIsOpenTrue();

}
