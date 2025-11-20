package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.response.ExamRegistrationResponse;
import com.examreg.examreg.models.ExamRegistration;

public interface IExamRegistrationService {

  public boolean existsByStudentIdAndExamSessionId(Long studentId, Long examSessionId);

  public int getRegisteredCount(Long examSessionId);

  public List<ExamRegistration> getExamRegistrationsByStudentId(Long studentId);

  public List<ExamRegistrationResponse> getExamRegistrationResponses(Long studentId);

  public void deleteExamRegistration(Long examRegistrationId, Long studentId);

  public void saveExamRegistration(ExamRegistration examRegistration);
}
