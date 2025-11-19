package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.response.ExamRegistrationResponse;
import com.examreg.examreg.models.ExamRegistration;

public interface IExamRegistrationService {
  public int getRegisteredCount(Long examSessionId);

  public List<ExamRegistration> getExamRegistrationsByStudentId(Long studentId);

  public List<ExamRegistrationResponse> getExamRegistrationResponses(Long studentId);
}
