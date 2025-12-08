package com.examreg.examreg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examreg.examreg.models.PasswordResetToken;

public interface ResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
  Optional<PasswordResetToken> findByToken(String token);
}
