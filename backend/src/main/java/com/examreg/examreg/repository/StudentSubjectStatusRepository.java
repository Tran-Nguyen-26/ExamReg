package com.examreg.examreg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.models.StudentSubjectStatus;
import com.examreg.examreg.models.Subject;

public interface StudentSubjectStatusRepository extends JpaRepository<StudentSubjectStatus, Long> {

  // List<StudentSubjectStatus> findAllByStudentId(Long studentId);

  List<StudentSubjectStatus> findAllByStudent_IdAndExam_Id(Long studentId, Long examId);

  boolean existsByStudentAndSubjectAndExam(Student student, Subject subject, Exam exam);

}
