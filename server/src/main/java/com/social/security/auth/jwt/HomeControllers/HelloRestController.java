package com.social.security.auth.jwt.HomeControllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("home")
public class HelloRestController {

    @GetMapping("user")
    public String helloUser() {
        return "Hello User";
    }

    @GetMapping("admin")
    public String helloAdmin() {
        return "Hello Admin";
    }
    
    @GetMapping("/")
    public String hello() {
        return "Hello";
    }
    @GetMapping("/ping")
    public String ping() {
        return "Hello";
    }

}