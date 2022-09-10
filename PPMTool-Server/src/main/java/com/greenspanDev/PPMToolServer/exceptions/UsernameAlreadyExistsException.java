package com.greenspanDev.PPMToolServer.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException{
	private static final long serialVersionUID = -2068720323333054317L;

	public UsernameAlreadyExistsException(String message) {
		super(message);
	}
}