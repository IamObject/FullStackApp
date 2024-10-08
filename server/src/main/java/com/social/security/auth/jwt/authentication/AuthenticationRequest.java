package com.social.security.auth.jwt.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record AuthenticationRequest(@NotNull @Email String email,
		  @NotNull String password) {
	public AuthenticationRequest() {
	    this(null, null);
	  }
}
