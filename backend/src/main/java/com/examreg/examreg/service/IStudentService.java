package com.examreg.examreg.service;
import java.util.List;

import com.examreg.examreg.dto.request.AddStudentRequest;
import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.dto.response.ExamResponse;
import com.examreg.examreg.dto.response.StudentResponse;
import com.examreg.examreg.models.ExamRegistration;
import com.examreg.examreg.models.Student;

public interface IStudentService {

  public Student getStudentById(Long id);

  public void changePassword(Long studentId, ChangePasswordRequest request);

  public StudentResponse addStudent(AddStudentRequest request);

  List<StudentResponse> getAllStudents();

  StudentResponse updateStudent(Long id, AddStudentRequest request);

  void deleteStudent(Long id);
}
