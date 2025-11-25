package com.examreg.examreg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.ExamRegistration;

public interface ExamRegistrationRepository extends JpaRepository<ExamRegistration, Long> {

  int countByExamSessionId(Long examSessionId);

  List<ExamRegistration> findByStudentId(Long studentId);

  boolean existsByStudentIdAndExamSessionId(Long studentId, Long examSessionId);

  boolean existsByStudentIdAndExamSession_SubjectId(Long studentId, Long subjectId);

  boolean existsByIdAndStudentId(Long examRegistrationId, Long studentId);

}
