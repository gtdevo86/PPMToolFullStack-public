package com.greenspanDev.PPMToolServer.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.greenspanDev.PPMToolServer.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsername(String username);

	Optional<User> findById(Long id);

	Iterable<User> findAll();
}
