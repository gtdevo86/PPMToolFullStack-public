package com.greenspanDev.PPMToolServer.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.greenspanDev.PPMToolServer.models.Project;


@Repository
public interface ProjectRepository extends CrudRepository<Project,Long> {

	Project findByProjectIdentifier(String projectIdentifier);

	@Override
	Iterable<Project> findAll();
	
	Iterable<Project> findByProjectLeader(String projectLeader);
}

