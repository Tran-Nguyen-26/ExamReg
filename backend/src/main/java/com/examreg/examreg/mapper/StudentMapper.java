package com.examreg.examreg.mapper;

import org.springframework.stereotype.Component;

import com.examreg.examreg.dto.response.StudentResponse;
import com.examreg.examreg.models.Student;

@Component
public class StudentMapper {
  public StudentResponse buildStudentReponse(Student student) {
    return StudentResponse.builder()
      .id(student.getId())
      .email(student.getEmail())
      .studentCode(student.getStudentCode())
      .fullname(student.getFullname())
      .gender(student.getGender())
      .className(student.getClassName())
      .major(student.getMajor())
      .faculty(student.getFaculty())
      .build();
  }
}
