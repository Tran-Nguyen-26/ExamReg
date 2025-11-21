package com.examreg.examreg.service;

import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.models.Student;

public interface IStudentService {

  public Student getStudentById(Long id);

  public void changePassword(Long studentId, ChangePasswordRequest request);
}
