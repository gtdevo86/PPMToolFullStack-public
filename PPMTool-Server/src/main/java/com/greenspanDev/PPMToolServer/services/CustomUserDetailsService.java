package com.greenspanDev.PPMToolServer.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null)
			new UsernameNotFoundException("User not found");
		return user;
	}

	public User loadUserById(Long id) {
		Optional<User> user = userRepository.findById(id);
		// User user = userRepository.getReferenceById(id);
		if (user.isEmpty())
			new UsernameNotFoundException("User not found");
		return user.get();
	}

}
