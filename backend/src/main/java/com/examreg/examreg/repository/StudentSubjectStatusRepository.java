package com.examreg.examreg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.enums.EligibilityStatus;
import com.examreg.examreg.models.StudentSubjectStatus;
import com.examreg.examreg.models.Subject;

public interface StudentSubjectStatusRepository extends JpaRepository<StudentSubjectStatus, Long> {

  // List<StudentSubjectStatus> findAllByStudentId(Long studentId);

  List<StudentSubjectStatus> findAllByStudent_IdAndExam_Id(Long studentId, Long examId);

  boolean existsByStudentAndSubjectAndExam(Student student, Subject subject, Exam exam);

  Optional<StudentSubjectStatus> findByStudentAndSubjectAndExam(Student student, Subject subject, Exam exam);

  List<StudentSubjectStatus> findByExam_IdAndSubject_Id(Long examId, Long subjectId);
  
  List<StudentSubjectStatus> findAllByStudentId(Long studentId);
  
  @Query("SELECT COUNT(DISTINCT sss.student.id) FROM StudentSubjectStatus sss WHERE sss.exam.id = :examId AND sss.status = :status")
  Long countBySubject_ExamIdAndStatus(Long examId, EligibilityStatus status);

}
