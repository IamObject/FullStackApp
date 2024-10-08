package com.social;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@SpringBootApplication
@EnableWebSecurity
@EnableJpaAuditing//IT SAVES DATE N DB
//@Import({ MyConfig.class, MyAnotherConfig.class }) import explicitly without component scan
public class SpringBootSocialAuthApplication  {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSocialAuthApplication.class, args);
	}
}