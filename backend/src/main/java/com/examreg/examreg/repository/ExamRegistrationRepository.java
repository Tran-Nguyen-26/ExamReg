package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.ExamRegistration;

public interface ExamRegistrationRepository extends JpaRepository<ExamRegistration, Long> {

}
