package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Period;

public interface PeriodRepository extends JpaRepository<Period, Long> {

}
