package com.social.security.auth.jwt.user;

import lombok.Builder;

@Builder
public record UserView(
		  Long id,

		  String username,
		  String fullName
		) {

		}