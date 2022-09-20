package com.greenspanDev.PPMToolServer.exceptions;

public class ConnectionTimeoutResponce {
	private String message;

	
	public ConnectionTimeoutResponce(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}

}
