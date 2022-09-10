package com.greenspanDev.PPMToolServer.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.greenspanDev.PPMToolServer.models.Backlog;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
	
	Backlog findByProjectIdentifier(String Indentifier);
}
