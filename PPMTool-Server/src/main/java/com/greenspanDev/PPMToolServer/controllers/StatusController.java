package com.greenspanDev.PPMToolServer.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.greenspanDev.PPMToolServer.services.UserService;

@RestController
@RequestMapping("/api/status")
@CrossOrigin
public class StatusController {

	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public ResponseEntity<?> getServerStatus(){
		userService.checkStatus();
		return new ResponseEntity<String>("Server ok", HttpStatus.OK);
	}
}
