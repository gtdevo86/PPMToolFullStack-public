package com.greenspanDev.PPMToolServer.exceptions;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.google.gson.Gson;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {

		CustomAccessDeniedResponce accessDeniedResponce = new CustomAccessDeniedResponce(System.currentTimeMillis(),
				403, "Access denied");
		String jsonResponce = new Gson().toJson(accessDeniedResponce);
		response.setContentType("application/json");
		response.setStatus(403);
		response.getWriter().print(jsonResponce);
	}

}