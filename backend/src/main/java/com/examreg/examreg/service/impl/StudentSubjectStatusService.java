package com.examreg.examreg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examreg.examreg.models.StudentSubjectStatus;
import com.examreg.examreg.repository.StudentSubjectStatusRepository;
import com.examreg.examreg.service.IStudentSubjectStatusService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentSubjectStatusService implements IStudentSubjectStatusService {
  
  private final StudentSubjectStatusRepository statusRepository;

  @Override
  public List<StudentSubjectStatus> getStudentSubjectStatusByStudentId(Long studentId) {
    return statusRepository.findAllByStudentId(studentId);
  }
}
