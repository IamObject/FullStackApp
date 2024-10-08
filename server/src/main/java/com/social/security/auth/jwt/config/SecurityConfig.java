package com.social.security.auth.jwt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import com.social.security.auth.jwt.user.UserService;
import com.social.security.auth.jwt.utilities.JwtTokenFilter;


@Component
public class SecurityConfig   {
	

	@Autowired
   UserService userService;
    
	@Autowired
	JwtTokenFilter jwtTokenFilter;
	@Autowired
	LogoutHandler logoutHandler;
	
	@Autowired
    @Qualifier("customAuthenticationEntryPoint")
    AuthenticationEntryPoint authEntryPoint;
	
	 @Bean
	  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .cors().and()
	        .csrf().disable()
	        .authorizeHttpRequests()
	        .requestMatchers("/login","/static/*","/recipe/getAllRecipesByQuestionId/*","/authentication/**", "/ping", "/swagger-ui/*","*/localization/getLocalizationStringByLangCode/*","/home","/*.js","/*.css", "/favicon.ico","/login/**", "/resources/**","/comment/getAllCommentsByQuestionId/**","/subjects/allSubjects/**","/question/getAllQuestions/**")
	        .permitAll()
	        .anyRequest()
	          .authenticated()
	          .and().formLogin()
//	          .loginPage("/login")
//	          .permitAll()
	          .loginProcessingUrl("/login")
	          .permitAll()
//	          .defaultSuccessUrl("/selectapp").permitAll()
	        .and()
	          .sessionManagement()//every request should be authenticated means we should not store the authentication states or session states so seession should be stateless
	          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .authenticationProvider(authenticationProvider())
	      .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
	        .exceptionHandling()
	        .authenticationEntryPoint(authEntryPoint)
//				.authenticationEntryPoint((request, response, ex) -> {
//					response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "You are not authorized.Please login");
//				})
            .and()
	        .logout()
	        .logoutUrl("/logout")
	        .addLogoutHandler(logoutHandler)
	        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());
	    return http.build();
	  }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    

//    @Bean
//    GrantedAuthorityDefaults grantedAuthorityDefaults() {
//        return new GrantedAuthorityDefaults("**"); // Remove the ROLE_ prefix
//    }


    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      authProvider.setUserDetailsService(userDetailsService());
      authProvider.setPasswordEncoder(passwordEncoder());
      return authProvider;
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
      return username -> userService.findOneByUsername(username)
          .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    
//    @Bean
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().requestMatchers("/subjects/allSubjects/**");
//    }

}
