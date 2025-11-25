package com.examreg.examreg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.examreg.examreg.models.ExamSession;

import jakarta.persistence.LockModeType;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {

  List<ExamSession> findAllBySubjectIdIn(List<Long> subjectIds);


  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("SELECT e FROM ExamSession e WHERE e.id = :id")
  ExamSession findByIdForUpdate(Long id);
}
