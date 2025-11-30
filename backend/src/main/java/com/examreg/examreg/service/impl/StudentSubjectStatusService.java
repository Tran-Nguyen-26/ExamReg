package com.examreg.examreg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.request.AddStudentSubjectStatusRequest;
import com.examreg.examreg.dto.response.SubjectStatusResponse;
import com.examreg.examreg.mapper.SubjectStatusMapper;
import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.models.StudentSubjectStatus;
import com.examreg.examreg.models.Subject;
import com.examreg.examreg.repository.StudentSubjectStatusRepository;
import com.examreg.examreg.service.IExamService;
import com.examreg.examreg.service.IStudentService;
import com.examreg.examreg.service.IStudentSubjectStatusService;
import com.examreg.examreg.service.ISubjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentSubjectStatusService implements IStudentSubjectStatusService {
  
  private final StudentSubjectStatusRepository statusRepository;
  private final SubjectStatusMapper statusMapper;
  private final IStudentService studentService;
  private final ISubjectService subjectService;
  private final IExamService examService;

  @Override
  public List<StudentSubjectStatus> getStudentSubjectStatusByStudentIdAndExamId(Long studentId, Long examId) {
    return statusRepository.findAllByStudent_IdAndExam_Id(studentId, examId);
  }

  @Override
  public List<SubjectStatusResponse> getSubjectStatusResponseByStudentIdAndExamId(Long studentId, Long examId) {
    return statusRepository.findAllByStudent_IdAndExam_Id(studentId, examId)
      .stream()
      .map(statusMapper::buildSubjectStatusReponse)
      .toList();
  }

  @Override
  public void addStudentSubjectStatus(AddStudentSubjectStatusRequest request) {
    Student student = studentService.getStudentByStudentCode(request.getStudentCode());
    Subject subject = subjectService.getSubjectBySubjectCode(request.getSubjectCode());
    Exam exam = examService.getExamByExamCode(request.getExamCode());
    StudentSubjectStatus ssStatus = StudentSubjectStatus.builder()
      .status(request.getStatus())
      .student(student)
      .subject(subject)
      .exam(exam)
      .build();
    
    statusRepository.save(ssStatus);
  }
}
