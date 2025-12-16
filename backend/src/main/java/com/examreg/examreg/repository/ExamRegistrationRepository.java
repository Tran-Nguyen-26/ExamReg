package com.examreg.examreg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examreg.examreg.models.ExamRegistration;

public interface ExamRegistrationRepository extends JpaRepository<ExamRegistration, Long> {

  int countByExamSessionId(Long examSessionId);

  List<ExamRegistration> findByStudentId(Long studentId);

  boolean existsByStudentIdAndExamSessionId(Long studentId, Long examSessionId);

  boolean existsByIdAndStudentId(Long examRegistrationId, Long studentId);

  List<ExamRegistration> findByStudentIdAndExamSession_ExamId(Long studentId, Long examId);

  boolean existsByStudentIdAndExamSession_SubjectIdAndExamSession_ExamId(Long studentId, Long subjectId, Long examId);

  List<ExamRegistration> findByExamSessionId(Long examSessionId);

  @Query("SELECT er FROM ExamRegistration er " +
        "JOIN FETCH er.student s " +
        "WHERE er.examSession.id = :examSessionId " +
        "ORDER BY er.registeredAt ASC")
  List<ExamRegistration> findByExamSessionIdWithStudent(@Param("examSessionId") Long examSessionId);
}
