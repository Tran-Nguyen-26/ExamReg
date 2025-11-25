package com.examreg.examreg.service;

import com.examreg.examreg.dto.request.AddStudentRequest;
import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.models.Student;

public interface IStudentService {

  public Student getStudentById(Long id);

  public Student getStudentByStudentCode(String studentCode);

  public void changePassword(Long studentId, ChangePasswordRequest request);

  public void addStudent(AddStudentRequest request);
}
