package com.examreg.examreg.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentRegistrationDetailResponse {
    private Long registrationId;

    private Long subjectId;
    private String subjectName;
    private String subjectCode;

    private Long examSessionId;
    private LocalDate examSessionDate;
    private LocalTime examSessionTime;
    
    private String room;
    private String location;
}
