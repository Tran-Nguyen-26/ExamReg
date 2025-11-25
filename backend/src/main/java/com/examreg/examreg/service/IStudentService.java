package com.examreg.examreg.service;

import com.examreg.examreg.dto.request.AddStudentRequest;
import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.dto.response.StudentResponse;
import com.examreg.examreg.models.Student;

public interface IStudentService {

  public Student getStudentById(Long id);

  public void changePassword(Long studentId, ChangePasswordRequest request);

  public StudentResponse addStudent(AddStudentRequest request);
}
