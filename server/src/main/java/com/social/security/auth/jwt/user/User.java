package com.social.security.auth.jwt.user;


import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.social.security.auth.jwt.Role;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Table(name = "user")
@Builder
@AllArgsConstructor
@ToString
public class User  implements UserDetails {


  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

//  @CreatedDate
//  private LocalDateTime createdAt;
//  @LastModifiedDate
//  private LocalDateTime modifiedAt;

  private boolean is_enabled = true;

//  @Indexed(unique = true)
  private String username;
  private String email;
  private String password;
//  @Indexed
  private String fullName;
  
  private String refreshToken;
  @Transient
	private String confirmPassword;
  
//  @Enumerated(EnumType.STRING)
//  private Role role;
  
  @ElementCollection(targetClass=Role.class)
  private Set<Role> authorities = new HashSet<>();

//  @Override
//  public Collection<? extends GrantedAuthority> getAuthorities(){
//	return List.of(new SimpleGrantedAuthority(role.name()));  
//  }
  
  @Override
  public String getUsername(){
	  return email;
  }
  
  
  public User() {
  }

  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return is_enabled;
  }

  @Override
  public boolean isAccountNonLocked() {
    return is_enabled;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return is_enabled;
  }

@Override
public boolean isEnabled() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public String getPassword() {
	// TODO Auto-generated method stub
	return password;
}


@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	// TODO Auto-generated method stub
	return authorities;
}

}