package com.examreg.examreg.models;

import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Period {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int periodNumber;

  @JsonFormat(pattern = "hh:mm")
  private LocalTime startTime;

  @JsonFormat(pattern = "hh:mm")
  private LocalTime endTime;

  @OneToMany(mappedBy = "period")
  private List<ExamSession> examSessions;
}
