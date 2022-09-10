package com.greenspanDev.PPMToolServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenspanDev.PPMToolServer.exceptions.ProjectIdException;
import com.greenspanDev.PPMToolServer.exceptions.ProjectNotFoundException;
import com.greenspanDev.PPMToolServer.models.Backlog;
import com.greenspanDev.PPMToolServer.models.Project;
import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.repositories.BacklogRepository;
import com.greenspanDev.PPMToolServer.repositories.ProjectRepository;
import com.greenspanDev.PPMToolServer.repositories.UserRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project, String username){
		if(project.getId() != null){
			Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
			if(existingProject !=null &&(!existingProject.getProjectLeader().equals(username))){
				throw new ProjectNotFoundException("Project not found in your account");
			}else if(existingProject == null){
				throw new ProjectNotFoundException("Project with ID: '"+project.getProjectIdentifier()+"' cannot be updated because it doesn't exist");
			}
		}
		try{
			User user = userRepository.findByUsername(username);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

			if(project.getId()==null){
					Backlog backlog = new Backlog();
					project.setBacklog(backlog);
					backlog.setProject(project);
					backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			}
			
			if(project.getId()!=null){
				project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
			}
			return projectRepository.save(project);
		}catch (Exception e){
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists");
		}
	}
	
	public Project findProjectByIndentifier(String projectId, String username) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if(project == null){
			throw new ProjectNotFoundException("Project ID '" + projectId.toUpperCase() + "' not found");
		}
		if(!project.getProjectLeader().equals(username)){
			throw new ProjectNotFoundException("Project not found in your account");
		}
		return project;
	}
	
	public Iterable<Project> findAllProjects(String username){
		return projectRepository.findByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectId, String username) {		
		projectRepository.delete(findProjectByIndentifier(projectId,username));
	}
}
