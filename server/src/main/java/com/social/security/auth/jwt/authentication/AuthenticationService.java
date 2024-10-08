package com.social.security.auth.jwt.authentication;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.social.security.auth.jwt.token.Token;
import com.social.security.auth.jwt.token.TokenRepository;
import com.social.security.auth.jwt.token.TokenService;
import com.social.security.auth.jwt.token.TokenType;
import com.social.security.auth.jwt.user.RegisterUserRequest;
import com.social.security.auth.jwt.user.User;
import com.social.security.auth.jwt.user.UserService;
import com.social.security.auth.jwt.user.UserView;
import com.social.security.auth.jwt.utilities.JWTUtility;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
@Component
public class AuthenticationService {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JWTUtility jwtTokenUtil;

	@Autowired
	TokenRepository tokenRepository;
	
	@Autowired
	TokenService tokenService;
	
	@Autowired
	UserService userService;

	
	ResponseEntity<User> authenticate(AuthenticationRequest request) {

		try {
			var authenticate = authenticateUsingUsernameAndPassword(request.email(), request.password());
			User user = (User) authenticate.getPrincipal();
			String jwtToken = jwtTokenUtil.generateToken(user);
			var refreshToken = jwtTokenUtil.generateRefreshToken(user);
			  revokeAllUserTokens(user);
			    saveUserToken(user, jwtToken);
			    
			user.setPassword(jwtToken);
			user.setRefreshToken(refreshToken);
			user.setEmail(user.getUsername());
			return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtToken).body(user);
		} catch (BadCredentialsException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

	}

	public AuthenticationTokenResponse authenticateAndGetTokens(AuthenticationRequest request) {
		var authenticate = authenticateUsingUsernameAndPassword(request.email(), request.password());

		User user = (User) authenticate.getPrincipal();
//	        .orElseThrow();
		var jwtToken = jwtTokenUtil.generateToken(user);
		var refreshToken = jwtTokenUtil.generateToken(user);
		revokeAllUserTokens(user);
		saveUserToken(user, jwtToken);
		return AuthenticationTokenResponse.builder().accessToken(jwtToken).refreshToken(refreshToken).build();
	}

	private void saveUserToken(User user, String jwtToken) {
		var token = Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType(TokenType.BEARER)
				.expired(false)
				.revoked(false)
				.build();
		tokenRepository.save(token);
	}

	private void revokeAllUserTokens(User user) {
		var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);
		});
		tokenRepository.saveAll(validUserTokens);
	}

	Authentication authenticateUsingUsernameAndPassword(String username, String password) {

		return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	}

	public UserView registerUser(@Valid RegisterUserRequest request) throws Exception {
		return userService.create(request);
	}
	
	public AuthenticationTokenResponse refreshToken(
	          HttpServletRequest request,
	          HttpServletResponse response
	  ) throws IOException {
	    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
	    final String refreshToken;
	    final String userEmail;
	    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
	      return new AuthenticationTokenResponse();
	    }
	    refreshToken = authHeader.substring(7);
	    userEmail = jwtTokenUtil.extractUsername(refreshToken);
	    if (userEmail != null) {
	      var user = this.userService.findOneByUsername(userEmail)
	              .orElseThrow();
	      if (jwtTokenUtil.isTokenValid(refreshToken, user)) {
	        var accessToken = jwtTokenUtil.generateToken(user);
	        revokeAllUserTokens((User)user);
	        saveUserToken((User)user, accessToken);
	        var authResponse = AuthenticationTokenResponse.builder()
	                .accessToken(accessToken)
	                .refreshToken(refreshToken)
	                .build();
	        return  authResponse;
	      //  new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
	      }
	    }
		return new AuthenticationTokenResponse();
	  }

	public boolean isTokenValid(String token)  {
		String userEmailOrUsername= jwtTokenUtil.extractUsername(token);
		Optional<UserDetails> userDetails = userService.findOneByUsername(userEmailOrUsername);
		var isTokenValid = tokenService.isTokenValidInDatabase(token);
		var isTokenUsingJWTUtility = jwtTokenUtil.isTokenValid(token, userDetails.get());
		return  isTokenUsingJWTUtility && isTokenValid; 
		
	}

}
