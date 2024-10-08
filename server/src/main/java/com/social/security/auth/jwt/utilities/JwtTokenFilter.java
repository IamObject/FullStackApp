package com.social.security.auth.jwt.utilities;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.social.security.auth.jwt.token.TokenService;
import com.social.security.auth.jwt.user.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Component

@NoArgsConstructor
@AllArgsConstructor
//@Transactional(propagation=Propagation.REQUIRED, readOnly=true, noRollbackFor=Exception.class)
public class JwtTokenFilter extends OncePerRequestFilter {

	@Autowired
    JWTUtility jwtTokenUtil;
    
    @Autowired
    UserService userService;
    
    @Autowired
    TokenService tokenService;

    @Value("#{'${excludeURLsFromSecurity}'.split(',')}") 
	private List<String>  excludeURLsFromSecurity;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

    	AntPathMatcher pathMatcher=new AntPathMatcher();
    	
    	 boolean excludeURLFromSecurity= excludeURLsFromSecurity
         .stream()
         .anyMatch(p -> pathMatcher.match(p, request.getServletPath()));
    	 
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (excludeURLFromSecurity) {
        	chain.doFilter(request, response); //pass request and response to next filter
            return;//not required to continue the required filter 
          }
        
        if (header==null || !header.startsWith("Bearer ")) {
        	chain.doFilter(request, response);
            return;
        }

        final String token = getToken(header);
        // Get user identity and set it on the spring security context
        String userEmailOrUsername= jwtTokenUtil.extractUsername(token);
       
		if (userEmailOrUsername != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			Optional<UserDetails> userDetails = userService.findOneByUsername(userEmailOrUsername);
			
			if (tokenService.isTokenValidInDatabase(token) && jwtTokenUtil.isTokenValid(token,userDetails.get())) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.get().getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
			}
		}
        chain.doFilter(request, response);
        return;
    }


	private String getToken(final String header) {
		return header.split(" ")[1].trim();
	}
    
//	private boolean isHeaderContainsBearer(String header) {
//    	return !StaticUtilities.isEmpty(header) || isHeaderDoNotStartsWIthBearer(header);
//    }
//    
//	private boolean isHeaderDoNotStartsWIthBearer(String header){
//    	return !isHeaderStartsWithBearer(header);
//    }
//	private boolean isHeaderStartsWithBearer(String header){
//    	return header.startsWith("Bearer ");
//    }
    
}