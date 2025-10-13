package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.ExamSession;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {

}
