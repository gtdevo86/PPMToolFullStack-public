package com.greenspanDev.PPMToolServer.exceptions;

public class UsernameAlreadyExistsResponce {

	private String username;
	
	public UsernameAlreadyExistsResponce(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}