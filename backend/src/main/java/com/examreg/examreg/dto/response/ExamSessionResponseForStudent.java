package com.examreg.examreg.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.examreg.examreg.enums.ExamSessionStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExamSessionResponseForStudent {
  private Long id;
  private String examSessionCode;
  @JsonFormat(pattern = "dd/MM/yyyy")
  private LocalDate date;
  private int capacity;
  private int registeredCount;
  @JsonFormat(pattern = "HH:mm")
  private LocalTime startTime;
  private RoomResponse room;
  private SubjectStatusResponse subjectStatus;
  private ExamSessionStatus status;
}