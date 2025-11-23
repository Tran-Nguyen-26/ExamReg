package com.examreg.examreg.dto.response;

import com.examreg.examreg.enums.EligibilityStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SubjectStatusResponse {
  private Long id;
  private EligibilityStatus status;
  private SubjectResponse subject;
  private boolean registered; //dung cho page home
}
