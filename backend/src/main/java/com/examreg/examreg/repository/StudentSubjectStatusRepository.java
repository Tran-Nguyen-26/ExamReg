package com.examreg.examreg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.StudentSubjectStatus;

public interface StudentSubjectStatusRepository extends JpaRepository<StudentSubjectStatus, Long> {

  List<StudentSubjectStatus> findAllByStudentId(Long studentId);

}
