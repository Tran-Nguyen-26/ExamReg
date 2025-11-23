package com.examreg.examreg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.response.SubjectStatusResponse;
import com.examreg.examreg.mapper.SubjectStatusMapper;
import com.examreg.examreg.models.StudentSubjectStatus;
import com.examreg.examreg.repository.StudentSubjectStatusRepository;
import com.examreg.examreg.service.IStudentSubjectStatusService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentSubjectStatusService implements IStudentSubjectStatusService {
  
  private final StudentSubjectStatusRepository statusRepository;
  private final SubjectStatusMapper statusMapper;

  @Override
  public List<StudentSubjectStatus> getStudentSubjectStatusByStudentId(Long studentId) {
    return statusRepository.findAllByStudentId(studentId);
  }

  @Override
  public List<SubjectStatusResponse> getSubjectStatusResponse(Long studentId) {
    return statusRepository.findAllByStudentId(studentId)
      .stream()
      .map(statusMapper::buildSubjectStatusReponse)
      .toList();
  }
}
