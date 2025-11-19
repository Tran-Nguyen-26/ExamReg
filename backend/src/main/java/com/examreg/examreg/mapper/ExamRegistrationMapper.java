package com.examreg.examreg.mapper;

import org.springframework.stereotype.Component;

import com.examreg.examreg.dto.response.ExamRegistrationResponse;
import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.models.ExamRegistration;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ExamRegistrationMapper {

  private final ExamSessionMapper examSessionMapper;

  public ExamRegistrationResponse buildExamRegistrationResponse(ExamRegistration examRegistration) {

    ExamSessionResponse examSessionResponse = examSessionMapper
      .buildExamSessionResponse(examRegistration.getExamSession());

    return ExamRegistrationResponse.builder()
      .id(examRegistration.getId())
      .studentId(examRegistration.getStudent().getId())
      .registeredAt(examRegistration.getRegisteredAt())
      .examSession(examSessionResponse)
      .build();
  }
}
