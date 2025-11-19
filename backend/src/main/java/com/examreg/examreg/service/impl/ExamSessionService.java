package com.examreg.examreg.service.impl;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.dto.response.SubjectResponse;
import com.examreg.examreg.enums.ExamSessionStatus;
import com.examreg.examreg.mapper.ExamSessionMapper;
import com.examreg.examreg.mapper.SubjectMapper;
import com.examreg.examreg.models.ExamSession;
import com.examreg.examreg.models.StudentSubjectStatus;
import com.examreg.examreg.repository.ExamSessionRepository;
import com.examreg.examreg.service.IExamRegistrationService;
import com.examreg.examreg.service.IExamSessionService;
import com.examreg.examreg.service.IStudentSubjectStatusService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamSessionService implements IExamSessionService {

  private final ExamSessionRepository examSessionRepository;
  private final IStudentSubjectStatusService statusService;
  private final ExamSessionMapper examSessionMapper;
  private final SubjectMapper subjectMapper;
  private final IExamRegistrationService examRegistrationService;
  
  @Override
  public List<ExamSessionResponse> getExamSessionResponses(Long studentId) {

    Map<Long, StudentSubjectStatus> statusMap = statusService.getStudentSubjectStatusByStudentId(studentId)
      .stream()
      .collect(Collectors.toMap(s -> s.getSubject().getId(), Function.identity()));
    List<Long> subjectIds = statusMap.keySet().stream().toList();
    List<ExamSession> examSessions = getExamSessionsBySubjectIds(subjectIds);
    List<ExamSessionResponse> responses = examSessions.stream().map(session -> {

      StudentSubjectStatus studentSubjectStatus = statusMap.get(session.getSubject().getId());
      SubjectResponse subjectResponse = subjectMapper.buildSubjectResponse(
        studentSubjectStatus.getSubject(), studentSubjectStatus.getStatus()
      );


      int registeredCount = examRegistrationService.getRegisteredCount(session.getId());
      ExamSessionStatus s = ExamSessionStatus.AVAILABLE;
      if (registeredCount < session.getCapacity()) {
        s = ExamSessionStatus.AVAILABLE;
      } else if (registeredCount == session.getCapacity()) {
        s = ExamSessionStatus.FULL;
      } else if (registeredCount > session.getCapacity()) {
        throw new RuntimeException("so luong dang ki > so luong toi da");
      }
      ExamSessionResponse examSessionResponse = examSessionMapper.buildExamSessionResponse(session, registeredCount, s);
      examSessionResponse.setSubject(subjectResponse);
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
      .filter(es -> es.getSubject().getId().equals(subjectId))
      .toList();
  }
  
}
