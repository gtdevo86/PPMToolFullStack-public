package com.greenspanDev.PPMToolServer.exceptions;

public class UserNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 8230269846319390506L;

	public UserNotFoundException(String message) {
		super(message);
	}

}
