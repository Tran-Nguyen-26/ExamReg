package com.examreg.examreg.service;

import com.examreg.examreg.dto.request.ChangePasswordFirstimeRequest;
import com.examreg.examreg.dto.request.UserLoginRequest;
import com.examreg.examreg.dto.response.AuthResponse;

public interface IAuthService {

  public AuthResponse<?> login(UserLoginRequest request);

  public void changePasswordFirstTime(Long studentId, ChangePasswordFirstimeRequest request);
}
