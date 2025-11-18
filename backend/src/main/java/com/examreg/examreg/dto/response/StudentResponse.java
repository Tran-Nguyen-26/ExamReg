package com.examreg.examreg.dto.response;

import com.examreg.examreg.enums.Gender;
import com.examreg.examreg.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentResponse {
  private Long id;
  private String email;
  private String studentCode;
  private String fullname;
  private Gender gender;
  private String className;
  private String major;
  private String faculty;
  private Role role;
  private boolean firstLogin;
}
