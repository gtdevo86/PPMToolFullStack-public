package com.greenspanDev.PPMToolServer.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.greenspanDev.PPMToolServer.exceptions.InvalidLoginResponce;
import com.google.gson.Gson;

@Component
public class JwtAuthenticationEntryPoint  implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		
		InvalidLoginResponce loginResponce = new InvalidLoginResponce();
		String jsonLoginResponce = new Gson().toJson(loginResponce);
		response.setContentType("application/json");
		response.setStatus(401);
		response.getWriter().print(jsonLoginResponce);
	}
}
