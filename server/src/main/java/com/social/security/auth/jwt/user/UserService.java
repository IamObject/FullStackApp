package com.social.security.auth.jwt.user;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.social.security.auth.jwt.Role;

import jakarta.validation.ValidationException;

@Service
@Transactional
public class UserService  {

	@Autowired
	UserRepository userRepository;

//	@Transactional
	public UserView create(RegisterUserRequest request) throws Exception {
		if (this.findOneByUsername(request.username()).isPresent()) {
			throw new ValidationException("Username exists!");
		}
		if (!request.password().equals(request.rePassword())) {
			throw new ValidationException("Passwords don't match!");
		}

		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		User user = User.builder()
				.authorities(request.authorities().stream().map(Role::new).collect(Collectors.toSet()))
				.fullName(request.fullName())
//    		.id(request.)
				.is_enabled(true).password(passwordEncoder.encode(request.password())).username(request.username())
				.email(request.username())
				.build();

		user = userRepository.save(user);

		UserView userView = UserView.builder().fullName(user.getFullName()).username(user.getUsername())
				.id(user.getId()).build();

		return userView;
	}
//
	public Optional<UserDetails> findOneByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findOneByUsername(username);
		
	}
	//
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		return loadUserByUsername(username);
//		
//	}


}