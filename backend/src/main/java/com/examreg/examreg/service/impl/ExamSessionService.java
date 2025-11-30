package com.examreg.examreg.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  public List<ExamSessionResponse> getExamSessionResponses(Long studentId, Long examId) {

    Map<Long, SubjectStatusResponse> statusMap = statusService.getSubjectStatusResponseByStudentIdAndExamId(studentId, examId)
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
  public List<ExamSessionResponse> getExamSessionResponsesBySubjectId(Long studentId, Long subjectId, Long examId) {
    List<ExamSessionResponse> examSessionResponses = getExamSessionResponses(studentId, examId);
    return examSessionResponses
      .stream()
      .filter(es -> es.getSubjectStatus().getSubject().getId().equals(subjectId))
      .toList();
  }

  @Override
  @Transactional
  public void registerExamSession(Long examSessionId, Long studentId) {
    //Lock
    ExamSession examSession = examSessionRepository.findByIdForUpdate(examSessionId);
    if (examSession == null) {
      throw new ResourceNotFoundException("Không tìm thấy ca thi");
    }

    if(examRegistrationService.getRegisteredCount(examSessionId) >= examSession.getCapacity()) {
      throw new BadRequestException("Ca thi đã đủ số lượng đăng kí");
    } 

    boolean alreadyRegistered = examRegistrationService.existsByStudentIdAndExamSessionId(studentId, examSessionId);
    if (alreadyRegistered) {
      throw new BadRequestException("Bạn đã đăng kí ca thi này rồi");
    }

    Long examId = examSession.getExam().getId();
    Long subjectId = examSession.getSubject().getId();
    boolean registeredSameSubject = examRegistrationService.existsByStudentIdAndExamSession_SubjectId_ExamId(studentId, subjectId, examId);
    if (registeredSameSubject) {
      throw new BadRequestException("Bạn đã đăng kí ca thi có môn học này");
    }

    //conflict time
    List<ExamRegistration> existingRegistrations = examRegistrationService.getExamRegistrationsByStudentId(studentId, examId);
    LocalDateTime start =  LocalDateTime.of(examSession.getDate(), examSession.getStarTime());
    LocalDateTime end = start.plusMinutes(examSession.getSubject().getDuration());
    boolean overlap = existingRegistrations.stream().anyMatch(reg -> {
      ExamSession existing = reg.getExamSession();
      LocalDateTime existingStart = LocalDateTime.of(existing.getDate(), existing.getStarTime());
      LocalDateTime existingEnd = existingStart.plusMinutes(existing.getSubject().getDuration());
      return start.isBefore(existingEnd) && existingStart.isBefore(end);
    });

    if (overlap) {
      throw new BadRequestException("Ca thi trùng thời gian với ca thi đã đăng kí");
    }

    Student student = studentService.getStudentById(studentId);

    ExamRegistration examRegistration = ExamRegistration.builder()
      .student(student)
      .examSession(examSession)
      .registeredAt(LocalDateTime.now())
      .build();
    
    examRegistrationService.saveExamRegistration(examRegistration);
  }

  public List<SubjectStatusResponse> getStatusRegisterResponses(Long studentId, Long examId) {
    List<ExamRegistration> examRegistrations = examRegistrationService.getExamRegistrationsByStudentId(studentId, examId);
    Set<Long> registeredSubjectIds = examRegistrations.stream()
      .map(eR -> eR.getExamSession().getSubject().getId())
      .collect(Collectors.toSet());
    List<SubjectStatusResponse> ssRes = statusService.getSubjectStatusResponseByStudentIdAndExamId(studentId, examId);
    return ssRes.stream()
      .map(status -> {
        boolean registered = registeredSubjectIds.contains(status.getSubject().getId());
        status.setRegistered(registered);
        return status;
      })
      .toList();
  }
  
}
