package com.examreg.examreg.service.impl;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.examreg.examreg.service.IBlacklistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlacklistService implements IBlacklistService {

  private final RedisTemplate<String, String> redisTemplate;

  private static final String BLACKLIST_PREFIX = "blacklist:token:";
  
  @Override
  public void addToBlacklist(String jti, Long expirationTimeMs) {
    String key = BLACKLIST_PREFIX + jti;
    redisTemplate.opsForValue().set(
      key, 
      "backlisted", 
      expirationTimeMs, 
      TimeUnit.MILLISECONDS);
  }

  @Override
  public boolean isBlacklisted(String jti) {
    String key = BLACKLIST_PREFIX + jti;
    Boolean exists = redisTemplate.hasKey(key);
    return Boolean.TRUE.equals(exists);
  }

  @Override
  public Long getBlacklistSize() {
    var keys = redisTemplate.keys(BLACKLIST_PREFIX + "*");
    return keys != null ? (long) keys.size() : 0L;
  }
  
}
