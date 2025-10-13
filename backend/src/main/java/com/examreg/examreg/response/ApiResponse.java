package com.examreg.examreg.response;

import lombok.Data;

@Data
public class ApiResponse {
  private int status;
  private String message;
  private Object data;
}
