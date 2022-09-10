package com.greenspanDev.PPMToolServer.exceptions;

public class InvalidLoginResponce {
	private String username;
	private String password;
	
	public InvalidLoginResponce() {
		super();
		username = "Invalid Username";
		password = "Invalid Password";
		
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
