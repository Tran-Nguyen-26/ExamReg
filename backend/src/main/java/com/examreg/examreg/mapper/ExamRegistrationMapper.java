package com.examreg.examreg.mapper;

import org.springframework.stereotype.Component;

import com.examreg.examreg.dto.response.ExamRegistrationResponse;
import com.examreg.examreg.dto.response.ExamSessionResponseForStudent;
import com.examreg.examreg.models.ExamRegistration;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ExamRegistrationMapper {

  private final ExamSessionMapperForStudent examSessionMapper;

  public ExamRegistrationResponse buildExamRegistrationResponse(ExamRegistration examRegistration) {

    ExamSessionResponseForStudent examSessionResponse = examSessionMapper
      .buildExamSessionResponse(examRegistration.getExamSession());

    return ExamRegistrationResponse.builder()
      .id(examRegistration.getId())
      .studentId(examRegistration.getStudent().getId())
      .registeredAt(examRegistration.getRegisteredAt())
      .examSession(examSessionResponse)
      .build();
  }
}
