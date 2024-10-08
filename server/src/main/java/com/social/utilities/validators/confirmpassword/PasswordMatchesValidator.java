package com.social.utilities.validators.confirmpassword;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.social.security.auth.jwt.user.User;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator 
implements ConstraintValidator<PasswordMatches, Object> { 
   
  @Override
  public void initialize(PasswordMatches constraintAnnotation) {       
  }
  @Override
  public boolean isValid(Object obj, ConstraintValidatorContext context){   
      User newUser = (User) obj;
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		String hashedPassword = passwordEncoder.encode(newUser.getPassword());
//		String machinghashedPassword = passwordEncoder.encode(newUser.getMatchingPassword());
      return passwordEncoder.matches(newUser.getConfirmPassword(), newUser.getPassword());    
  }     
}
