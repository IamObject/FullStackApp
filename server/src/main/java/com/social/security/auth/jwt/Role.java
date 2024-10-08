package com.social.security.auth.jwt;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority {

  private static final long serialVersionUID = 1L;
  public static final String USER = "USER";
  public static final String ADMIN = "ADMIN";
  

  private String authority;

  
}