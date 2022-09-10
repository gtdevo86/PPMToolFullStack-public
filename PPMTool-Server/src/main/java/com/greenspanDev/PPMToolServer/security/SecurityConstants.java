package com.greenspanDev.PPMToolServer.security;

public class SecurityConstants {
	public static final String SIGN_UP_URLS = "/api/users/**";
	public static final String SECRET = "jF3NF8X9CbrGzuvr4rv4@dVnbEipFj4Y7$ZPiU6*7!jdrRfoJv%UMb!!6!VCMfeK";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final long  DAYS = 7;
	public static final long  EXPIRATION_TIME = DAYS * 24 * 60 * 60 *1000;
	
}
