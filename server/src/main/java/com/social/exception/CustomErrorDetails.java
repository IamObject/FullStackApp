package com.social.exception;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
//@NoArgsConstructor
@AllArgsConstructor
public class CustomErrorDetails  {
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private Date timestamp;
  private HttpStatus status;
  private String genericMessage;
  private String debugMessage;
  private String errorMessage;
  private List<ApiValidationError> subErrors;
  private CustomErrorDetails() {
      timestamp = new Date();
  }
  
  private CustomErrorDetails(HttpStatus status) {
	  this();
      this.status = status;
  }
  
  CustomErrorDetails(HttpStatus status, String debugMsg ) {
      this();
      this.status = status;
      this.genericMessage = "Unexpected error";
      this.debugMessage = debugMsg;
  }
  
  CustomErrorDetails(HttpStatus status, String message, String debugMsg ) {
      this();
      this.status = status;
      this.genericMessage = message;
      this.debugMessage = debugMsg;
  }
  
  
public CustomErrorDetails(HttpStatus status, String message, String debugMsg,
		List<ApiValidationError> subErrors) {
	super();
	this.status = status;
	this.genericMessage = message;
	this.debugMessage = debugMsg;
	this.subErrors = subErrors;
}


}