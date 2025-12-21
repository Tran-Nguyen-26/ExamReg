package com.examreg.examreg.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StudentRegistrationResponse {
    private Long id;
    private String studentCode;
    private String fullName;
    private String email;
    private String phone;
    private LocalDateTime registeredAt;
}
