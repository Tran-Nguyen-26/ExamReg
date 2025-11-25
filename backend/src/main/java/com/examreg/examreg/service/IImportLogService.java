package com.examreg.examreg.service;

import org.springframework.web.multipart.MultipartFile;

public interface IImportLogService {
  
  void importStudents(MultipartFile file);

  void importEligibleStudentsForSubject(MultipartFile file, String subjectCode);
}
