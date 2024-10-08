package com.social.exception;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;

@ControllerAdvice
public class GlobalExceptionHandler{

	private final Logger logger = LogManager.getLogger();

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<CustomErrorDetails> handleNotFoundException(HttpServletRequest request,
			RuntimeException ex) {
		logger.error("NotFoundException {}\n", request.getRequestURI(), ex);
		CustomErrorDetails errorDetails = new CustomErrorDetails(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ex.getLocalizedMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);
	}

	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<CustomErrorDetails> handleValidationException(HttpServletRequest request,
			ValidationException ex) {
		logger.error("ValidationException {}\n", request.getRequestURI(), ex);
		CustomErrorDetails errorDetails = new CustomErrorDetails(HttpStatus.BAD_REQUEST, "Very bad request", ex.getLocalizedMessage());
		return ResponseEntity.badRequest().body(errorDetails);
	}

	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<CustomErrorDetails> handleMissingServletRequestParameterException(
			HttpServletRequest request, MissingServletRequestParameterException ex) {
		logger.error("handleMissingServletRequestParameterException {}\n", request.getRequestURI(), ex);
		CustomErrorDetails errorDetails = new CustomErrorDetails(HttpStatus.BAD_REQUEST, "Missing request parameter", ex.getLocalizedMessage());
		return ResponseEntity.badRequest().body(errorDetails);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<CustomErrorDetails> handleMethodArgumentTypeMismatchException(
			HttpServletRequest request, MethodArgumentTypeMismatchException ex) {
		logger.error("handleMethodArgumentTypeMismatchException {}\n", request.getRequestURI(), ex);

		ApiValidationError apiValidationError=new ApiValidationError(ex.getName(), ex.getMessage());
				
//		var details = new HashMap<String, String>();
//		
//		details.put("paramName", ex.getName());
//		details.put("paramValue", ofNullable(ex.getValue()).map(Object::toString).orElse(""));
//		details.put("errorMessage", ex.getMessage());
		
		CustomErrorDetails errorDetails = new CustomErrorDetails(
				HttpStatus.BAD_REQUEST,  "Method argument type mismatch", ex.getLocalizedMessage(),
				List.of(apiValidationError));
		return ResponseEntity.badRequest().body(errorDetails);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<CustomErrorDetails> handleMethodArgumentNotValidException(
			HttpServletRequest request, MethodArgumentNotValidException ex) {
		logger.error("handleMethodArgumentNotValidException {}\n", request.getRequestURI(), ex.getLocalizedMessage());
	
		
	//	var details = new ArrayList<Map<String, String>>();
		var details = new ArrayList<ApiValidationError>();
		ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
			
//			Map<String, String> detail = new HashMap<>();
//			detail.put("objectName", fieldError.getObjectName());
//			detail.put("field", fieldError.getField());
//			detail.put("rejectedValue", "" + fieldError.getRejectedValue());
//			detail.put("errorMessage", fieldError.getDefaultMessage());
			ApiValidationError apiValidationError=new ApiValidationError(fieldError.getObjectName(), fieldError.getDefaultMessage());
			details.add(apiValidationError);
		});
		CustomErrorDetails errorDetails = new CustomErrorDetails(
				HttpStatus.BAD_REQUEST , "Method argument validation failed",ex.getLocalizedMessage(), 
				details);
		return ResponseEntity.badRequest().body(errorDetails);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<CustomErrorDetails> handleAccessDeniedException(HttpServletRequest request,
			AccessDeniedException ex) {
		logger.error("handleAccessDeniedException {}\n", request.getRequestURI(), ex);
		CustomErrorDetails errorDetails = new CustomErrorDetails(HttpStatus.FORBIDDEN, "Access denied!",ex.getLocalizedMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorDetails);
	}

	@ExceptionHandler(Exception.class)
  public ResponseEntity<CustomErrorDetails> handleInternalServerError(
      HttpServletRequest request, Exception ex) {
    logger.error("handleInternalServerError {}\n", request.getRequestURI(), ex);
    CustomErrorDetails errorDetails = new CustomErrorDetails( HttpStatus.INTERNAL_SERVER_ERROR ,"Internal server error",ex.getLocalizedMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);
  }
	
	@ExceptionHandler(AuthenticationException.class)
	  public ResponseEntity<CustomErrorDetails> authenticationException(
	      HttpServletRequest request, Exception ex) {
	    logger.error("CustomeException {}\n", request.getRequestURI(), ex);
	    CustomErrorDetails errorDetails = new CustomErrorDetails( HttpStatus.BAD_REQUEST ,ex.getLocalizedMessage(),"Internal server error");
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDetails);
	  }
//	
}
