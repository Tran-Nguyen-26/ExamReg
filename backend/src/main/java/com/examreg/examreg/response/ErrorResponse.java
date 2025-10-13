package com.examreg.examreg.response;

import java.util.Date;

import lombok.Data;

@Data
public class ErrorResponse {
  private Date timestamp;
  private int status;
  private String path;
  private String error;
  private String message;
}
