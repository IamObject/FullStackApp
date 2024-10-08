package com.social.security.auth.jwt.user;


import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


public record RegisterUserRequest( @JsonProperty("username") @NotBlank @Email String username,
		@JsonProperty("fullName")  @NotBlank String fullName,
		@JsonProperty("password")  @NotBlank String password,
		@JsonProperty("confirmPassword")  @NotBlank String rePassword,
		@JsonProperty("authorities")  Set<String> authorities) {

  public RegisterUserRequest {
    if (authorities == null) {
      authorities = new HashSet<>();
    }
  }

  public RegisterUserRequest(
    String username,
    String fullName,
    String password,
    String rePassword
  ) {
    this(username, fullName, password, rePassword, new HashSet<>());
  }

  public RegisterUserRequest(
    String username,
    String fullName,
    String password
  ) {
    this(username, fullName, password, password, new HashSet<>());
  }
}