package com.examreg.examreg.dto.response;

import com.examreg.examreg.enums.EligibilityStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubjectResponse {
  private Long id;
  private String name;
  private String subjectCode;
  private int creditHour;
  private int duration;
  private EligibilityStatus status;
}
