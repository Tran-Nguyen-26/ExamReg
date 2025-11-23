package com.examreg.examreg.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.dto.response.SubjectStatusResponse;
import com.examreg.examreg.enums.EligibilityStatus;
import com.examreg.examreg.enums.ExamSessionStatus;
import com.examreg.examreg.exceptions.BadRequestException;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.mapper.ExamSessionMapper;
import com.examreg.examreg.models.ExamRegistration;
import com.examreg.examreg.models.ExamSession;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.repository.ExamSessionRepository;
import com.examreg.examreg.service.IExamRegistrationService;
import com.examreg.examreg.service.IExamSessionService;
import com.examreg.examreg.service.IStudentService;
import com.examreg.examreg.service.IStudentSubjectStatusService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamSessionService implements IExamSessionService {

  private final ExamSessionRepository examSessionRepository;
  private final IStudentSubjectStatusService statusService;
  private final ExamSessionMapper examSessionMapper;
  private final IExamRegistrationService examRegistrationService;
  private final IStudentService studentService;
  
  @Override
  public List<ExamSessionResponse> getExamSessionResponses(Long studentId) {

    Map<Long, SubjectStatusResponse> statusMap = statusService.getSubjectStatusResponse(studentId)
      .stream()
      .collect(Collectors.toMap(s -> s.getSubject().getId(), Function.identity()));

    List<Long> subjectIds = statusMap.keySet().stream().toList();

    List<ExamSession> examSessions = getExamSessionsBySubjectIds(subjectIds);
    List<ExamSessionResponse> responses = examSessions.stream().map(session -> {

      SubjectStatusResponse ssRes = statusMap.get(session.getSubject().getId());

      ExamSessionStatus s = ExamSessionStatus.AVAILABLE;
      int registeredCount = examRegistrationService.getRegisteredCount(session.getId());
      boolean registered = examRegistrationService.existsByStudentIdAndExamSessionId(studentId, session.getId());

      if (registered) {
        s = ExamSessionStatus.REGISTERED;
      } else if (ssRes.getStatus() == EligibilityStatus.INELIGIBLE) {
        s = ExamSessionStatus.NOT_ELIGIBLE;
      } else if (registeredCount == session.getCapacity()) {
        s = ExamSessionStatus.FULL;
      } else if (registeredCount > session.getCapacity()) {
        throw new RuntimeException("so luong dang ki > so luong toi da");
      }
      ExamSessionResponse examSessionResponse = examSessionMapper.buildExamSessionResponse(session, registeredCount, s);
      examSessionResponse.setSubjectStatus(ssRes);
      return examSessionResponse;
    }).toList();
    return responses;
  }

  private List<ExamSession> getExamSessionsBySubjectIds(List<Long> subjectIds) {
    return examSessionRepository.findAllBySubjectIdIn(subjectIds);
  }

  @Override
  public List<ExamSessionResponse> getExamSessionResponsesBySubjectId(Long studentId, Long subjectId) {
    List<ExamSessionResponse> examSessionResponses = getExamSessionResponses(studentId);
    return examSessionResponses
      .stream()
      .filter(es -> es.getSubjectStatus().getSubject().getId().equals(subjectId))
      .toList();
  }

  @Override
  public void registerExamSession(Long examSessionId, Long studentId) {
    List<ExamSessionResponse> examSessionResponses = getExamSessionResponses(studentId);
    ExamSessionResponse existsExamSession = examSessionResponses.stream()
      .filter(esp -> esp.getId().equals(examSessionId))
      .findFirst()
      .orElseThrow(() -> new BadRequestException("Exam session not found in student's list"));


    if (existsExamSession.getStatus() == ExamSessionStatus.REGISTERED) {
      throw new BadRequestException("Exam session already registered");
    } else if (existsExamSession.getStatus() == ExamSessionStatus.NOT_ELIGIBLE) {
      throw new BadRequestException("Student is not eligible to register for this exam session");
    } else if (existsExamSession.getStatus() == ExamSessionStatus.FULL) {
      throw new BadRequestException("Exam session is already full");
    }

    ExamSession examSession = getExamSessionById(examSessionId);
    Student student = studentService.getStudentById(studentId);

    Long subjectId = examSession.getSubject().getId();
    boolean hasRegisteredThisSubject = examSessionResponses.stream()
      .anyMatch(esp -> esp.getSubjectStatus().getSubject().getId().equals(subjectId) && esp.getStatus() == ExamSessionStatus.REGISTERED);
    
    if (hasRegisteredThisSubject) {
      throw new BadRequestException("You have already registered another exam session of this subject");
    }


    ExamRegistration examRegistration = ExamRegistration
      .builder()
      .student(student)
      .examSession(examSession)
      .registeredAt(LocalDateTime.now())
      .build();
    examRegistrationService.saveExamRegistration(examRegistration);
  }

  private ExamSession getExamSessionById(Long examSessionId) {
    return examSessionRepository.findById(examSessionId)
      .orElseThrow(() -> new ResourceNotFoundException("Exam session not found with id: " + examSessionId));
  }

  public List<SubjectStatusResponse> getStatusRegisterResponses(Long studentId) {
    List<ExamRegistration> examRegistrations = examRegistrationService.getExamRegistrationsByStudentId(studentId);
    Set<Long> registeredSubjectIds = examRegistrations.stream()
      .map(eR -> eR.getExamSession().getSubject().getId())
      .collect(Collectors.toSet());
    List<SubjectStatusResponse> ssRes = statusService.getSubjectStatusResponse(studentId);
    return ssRes.stream()
      .map(status -> {
        boolean registered = registeredSubjectIds.contains(status.getSubject().getId());
        status.setRegistered(registered);
        return status;
      })
      .toList();
  }

  //ham kiem tra trung lich
  // ....
  
}
