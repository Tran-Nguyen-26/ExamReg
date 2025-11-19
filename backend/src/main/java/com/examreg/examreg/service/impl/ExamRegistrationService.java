package com.examreg.examreg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.response.ExamRegistrationResponse;
import com.examreg.examreg.mapper.ExamRegistrationMapper;
import com.examreg.examreg.models.ExamRegistration;
import com.examreg.examreg.repository.ExamRegistrationRepository;
import com.examreg.examreg.service.IExamRegistrationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamRegistrationService implements IExamRegistrationService {
  
  private final ExamRegistrationRepository examRegistrationRepository;
  private final ExamRegistrationMapper examRegistrationMapper;

  @Override
  public int getRegisteredCount(Long examSessionId) {
    return examRegistrationRepository.countByExamSessionId(examSessionId);
  }

  @Override
  public List<ExamRegistration> getExamRegistrationsByStudentId(Long studentId) {
    return examRegistrationRepository.findByStudentId(studentId);
  }

  @Override
  public List<ExamRegistrationResponse> getExamRegistrationResponses(Long studentId) {
    List<ExamRegistration> examRegistrations = getExamRegistrationsByStudentId(studentId);
    return examRegistrations
      .stream()
      .map(e -> examRegistrationMapper.buildExamRegistrationResponse(e))
      .toList();
  }
}
