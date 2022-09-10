package com.greenspanDev.PPMToolServer.exceptions;

public class ProjectIdExceptionResponce {

	private String projectIdentifer;
	
	public ProjectIdExceptionResponce(String projectIdentifier) {
		this.projectIdentifer = projectIdentifier;
	
	}
	
	public String getProjectIdentifer() {
		return projectIdentifer;
	}

	public void setProjectIdentifer(String projectIdentifer) {
		this.projectIdentifer = projectIdentifer;
	}
}
