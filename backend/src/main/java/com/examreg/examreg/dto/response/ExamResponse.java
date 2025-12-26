package com.examreg.examreg.dto.response;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExamResponse {
    private Long id;
    private String examName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private String examSatus;
    private boolean isOpen;
    private int totalSubjects;
    private int totalSessions;
    private int totalRegistrations;
}