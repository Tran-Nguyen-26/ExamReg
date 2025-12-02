package com.examreg.examreg.service.impl;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.examreg.examreg.service.IEmailService;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

  private final JavaMailSender mailSender;

  @Override
  public void send(String to, String subject, String content) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(content, true);
      mailSender.send(message);
    } catch (Exception e) {
      throw new RuntimeException("Failed to send email", e);
    }
  }
  
}
