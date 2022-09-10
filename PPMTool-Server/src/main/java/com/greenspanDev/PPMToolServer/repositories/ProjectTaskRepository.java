package com.greenspanDev.PPMToolServer.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.greenspanDev.PPMToolServer.models.ProjectTask;

@Repository
public interface ProjectTaskRepository  extends CrudRepository<ProjectTask, Long>{

	List<ProjectTask> findByProjectIdentifierOrderByPriority(String projectIdentifier);
	ProjectTask findByProjectSequence(String projectSequence);
}
