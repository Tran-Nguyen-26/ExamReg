package com.examreg.examreg.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Subject {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String subjectCode;

  private String name;

  private int creditHour;

  @OneToMany(mappedBy = "subject")
  private List<StudentSubject> studentSubjects;

  @OneToMany(mappedBy = "subject")
  private List<ExamSession> examSessions;

  @ManyToOne
  @JoinColumn(name="exam_id")
  private Exam exam;
}
