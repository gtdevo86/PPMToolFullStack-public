package com.greenspanDev.PPMToolServer.exceptions;

import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice
public class CustomResponceEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler
	public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest requset) {
		ProjectIdExceptionResponce exceptionResponce = new ProjectIdExceptionResponce(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponce, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex,
			WebRequest requset) {
		ProjectNotFoundExceptionResponce exceptionResponce = new ProjectNotFoundExceptionResponce(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponce, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex,
			WebRequest requset) {
		UsernameAlreadyExistsResponce exceptionResponce = new UsernameAlreadyExistsResponce(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponce, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleConnectException(SQLException ex, WebRequest requset) {
		ConnectionTimeoutResponce exceptionResponce = new ConnectionTimeoutResponce(
				"SQL Server is down please try again later");
		return new ResponseEntity<Object>(exceptionResponce, HttpStatus.GATEWAY_TIMEOUT);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, WebRequest requset) {
		UserNotFoundExceptionResponce exceptionResponce = new UserNotFoundExceptionResponce(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponce, HttpStatus.BAD_REQUEST);
	}
}
