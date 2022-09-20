package com.greenspanDev.PPMToolServer.exceptions;

public class UserNotFoundExceptionResponce {

	private String username;

	public UserNotFoundExceptionResponce(String username) {
		super();
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
