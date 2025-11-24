package com.examreg.examreg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.ExamSession;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {

  List<ExamSession> findAllBySubjectIdIn(List<Long> subjectIds);

}
