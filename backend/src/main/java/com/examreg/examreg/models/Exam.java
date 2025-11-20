package com.examreg.examreg.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Exam {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

<<<<<<< Updated upstream
  private String examCode;

  private String examType;
=======
  private String examName;

  private LocalDate startDate;

  private LocalDate endDate;

  private String examStatus;

  @Column(columnDefinition = "TEXT")
  private String description; 
>>>>>>> Stashed changes

  @OneToMany(mappedBy = "exam")
  private List<Subject> subjects;
}
