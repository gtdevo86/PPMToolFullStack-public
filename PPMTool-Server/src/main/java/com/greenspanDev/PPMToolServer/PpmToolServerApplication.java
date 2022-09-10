package com.greenspanDev.PPMToolServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.jetty.JettyServletWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class PpmToolServerApplication {

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    ConfigurableServletWebServerFactory webServerFactory() 
    {
      JettyServletWebServerFactory factory = new JettyServletWebServerFactory();
      factory.setPort(8080);
      factory.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notfound.html"));
      return factory;
    }
    
	public static void main(String[] args) {
		SpringApplication.run(PpmToolServerApplication.class, args);
	}

}
