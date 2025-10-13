package com.examreg.examreg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.Admin;

public interface AdminRepositoty extends JpaRepository<Admin, Long> {

}
