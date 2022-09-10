package com.greenspanDev.PPMToolServer.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.payload.JWTLoginSuccessResponse;
import com.greenspanDev.PPMToolServer.payload.LoginRequest;
import com.greenspanDev.PPMToolServer.security.JwtTokenProvider;
import com.greenspanDev.PPMToolServer.services.MapValidationErrorService;
import com.greenspanDev.PPMToolServer.services.UserService;
import com.greenspanDev.PPMToolServer.validator.UserValidator;


@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserValidator userValidator;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser (@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap !=null) return errorMap;
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()
				)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser (@Valid @RequestBody User user, BindingResult result){
		
		userValidator.validate(user, result);
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap !=null) return errorMap;
		User newUser = userService.saveUser(user);
		return new ResponseEntity<User>(newUser,HttpStatus.CREATED);
	}
}
