package com.greenspanDev.PPMToolServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.greenspanDev.PPMToolServer.exceptions.UsernameAlreadyExistsException;
import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.repositories.RoleRepository;
import com.greenspanDev.PPMToolServer.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bcryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword("");
			newUser.setRoles(roleRepository.findAllByName("ROLE_USER"));
			// newUser.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));
			return userRepository.save(newUser);
		} catch (Exception e) {
			throw new UsernameAlreadyExistsException("username already exists");
		}
	}

	@SuppressWarnings("unused")
	public void checkStatus() {
		long count = userRepository.count();
	}
}
