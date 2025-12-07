package com.examreg.examreg.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ExamRegistrationResponse {
  private Long id;
  private Long studentId;
  private LocalDateTime registeredAt;
  private ExamSessionResponseForStudent examSession;
}
