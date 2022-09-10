package com.greenspanDev.PPMToolServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.greenspanDev.PPMToolServer.exceptions.UsernameAlreadyExistsException;
import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bcryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);
		}catch(Exception e) {
			throw new UsernameAlreadyExistsException("username already exists");
		}
	}
}

