package com.social.security.auth.jwt.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TokenService {

	@Autowired
	TokenRepository tokenRepository;
	
	public boolean isTokenValidInDatabase(String token)  {
		return  tokenRepository.findByToken(token).map(t -> !t.isExpired() && !t.isRevoked())
				.orElse(false);
		
	}
	
}
