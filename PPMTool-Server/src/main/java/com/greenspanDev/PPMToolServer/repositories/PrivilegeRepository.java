package com.greenspanDev.PPMToolServer.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.greenspanDev.PPMToolServer.models.Privilege;

@Repository
public interface PrivilegeRepository extends CrudRepository<Privilege, Long> {
	Privilege findByName(String Name);
}
