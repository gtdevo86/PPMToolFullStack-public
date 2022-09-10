package com.greenspanDev.PPMToolServer.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.greenspanDev.PPMToolServer.models.User;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

	User findByUsername(String username);
	User getReferenceById(Long id);
}
