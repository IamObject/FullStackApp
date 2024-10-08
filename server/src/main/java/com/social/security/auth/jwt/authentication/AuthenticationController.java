package com.social.security.auth.jwt.authentication;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.security.auth.jwt.LogoutService;
import com.social.security.auth.jwt.user.RegisterUserRequest;
import com.social.security.auth.jwt.user.User;
import com.social.security.auth.jwt.user.UserView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

//@Tag(name = "Authentication")
@RestController 
@RequestMapping(path = "authentication")
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin
public class AuthenticationController {
    
    @Autowired
    AuthenticationService authenticationService;
    
    @Autowired 
    LogoutService logoutService;

    @PostMapping("login")
    public ResponseEntity<User> login(@RequestBody @Valid AuthenticationRequest request) {
        return authenticationService.authenticate(request);
    }
    @GetMapping("login1")//why this have cors error
    public String loginget(@RequestBody @Valid AuthenticationRequest request) {
        return "redirect:login";
    }
    
    @PostMapping("/authenticateAndGetToken")
    public ResponseEntity<AuthenticationTokenResponse> authenticateAndGetToken(
        @RequestBody AuthenticationRequest request
    ) {
      return ResponseEntity.ok(authenticationService.authenticateAndGetTokens(request));
    }
    
    @PostMapping("registerUser")
    public UserView registerUser(@RequestBody @Valid RegisterUserRequest request) throws Exception {
    	
    	UserView userView =	authenticationService.registerUser(request);
    	return userView;
    }
    
    @GetMapping("userString")
    public String helloUser() {
        return "Hello  User";
    }
    
    @PostMapping("/refreshToken")
    public AuthenticationTokenResponse refreshToken(
        HttpServletRequest request,
        HttpServletResponse response) throws IOException {
    	return authenticationService.refreshToken(request, response);
    }
    
    @PostMapping("/validateToken")
    public boolean refreshToken(
    		@RequestBody String token) throws IOException {
    	return authenticationService.isTokenValid(token);
    }

}