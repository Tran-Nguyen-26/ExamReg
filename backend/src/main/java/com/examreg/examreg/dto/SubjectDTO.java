package com.examreg.examreg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
  private Long id;
  private String subjectCode;
  private String name;
  private int creditHour;
  private int duration;
  private Long examId;
}
