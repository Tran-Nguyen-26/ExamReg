package com.examreg.examreg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.request.AddStudentRequest;
import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.dto.response.StudentResponse;
import com.examreg.examreg.exceptions.BadRequestException;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.mapper.ExamMapper;
import com.examreg.examreg.mapper.StudentMapper;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.repository.StudentRepository;
import com.examreg.examreg.service.IStudentService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService implements IStudentService{
  
  private final StudentRepository studentRepository;
  private final StudentMapper studentMapper;
  private final PasswordEncoder passwordEncoder;

  @Override
  public Student getStudentById(Long id) {
    return studentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
  }

  @Override
  public void changePassword(Long studentId, ChangePasswordRequest request) {
    Student student = getStudentById(studentId);
    if (!passwordEncoder.matches(request.getCurrentPassword(), student.getPassword())) {
      throw new BadRequestException("Current password is incorrect");
    }
    student.setPassword(passwordEncoder.encode(request.getNewPassword()));
    studentRepository.save(student);
  }
  
  @Override
  public StudentResponse addStudent(AddStudentRequest request) {
    String defaultPassword = request.getEmail().substring(0, request.getEmail().indexOf("@"));

    Student student = new Student();
    student.setStudentCode(request.getCode());
    student.setFullname(request.getName());
    student.setGender(request.getGender());
    student.setDob(request.getDob());
    student.setClassName(request.getClassName());
    student.setPhone(request.getPhone());
    student.setMajor(request.getMajor());
    student.setFaculty(request.getFaculty());
    student.setEmail(request.getEmail());
    student.setPassword(passwordEncoder.encode(defaultPassword));

    Student savedStudent = studentRepository.save(student);
    return studentMapper.buildStudentReponse(savedStudent);
  }

  @Override
  public List<StudentResponse> getAllStudents() {
    List<Student> students = studentRepository.findAll();
    return students.stream().map(studentMapper::buildStudentReponse).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public StudentResponse updateStudent(Long id, AddStudentRequest request) {
    Student student = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Student not found with id: " + id));
    student.setStudentCode(request.getCode());
    student.setFullname(request.getName());
    student.setGender(request.getGender());
    student.setDob(request.getDob());
    student.setClassName(request.getClassName());
    student.setPhone(request.getPhone());
    student.setMajor(request.getMajor());
    student.setFaculty(request.getFaculty());
    student.setEmail(request.getEmail());

    Student updatedStudent = studentRepository.save(student);
    return studentMapper.buildStudentReponse(updatedStudent);
  }

  @Override
  public void deleteStudent(Long id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

    studentRepository.delete(student);
  }
}
