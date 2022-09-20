package com.greenspanDev.PPMToolServer.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.greenspanDev.PPMToolServer.exceptions.ProjectNotFoundException;
import com.greenspanDev.PPMToolServer.models.Project;
import com.greenspanDev.PPMToolServer.models.ProjectTask;
import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.repositories.ProjectRepository;
import com.greenspanDev.PPMToolServer.repositories.ProjectTaskRepository;
import com.greenspanDev.PPMToolServer.repositories.RoleRepository;
import com.greenspanDev.PPMToolServer.repositories.UserRepository;

@Service
public class AdminService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	@Autowired
	private RoleRepository roleRepository;

	// USERS
	public Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUser(Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty()) {
			throw new UsernameNotFoundException("User with ID:'" + id + "' not found");
		}
		user.get().setPassword(null);
		return user.get();
	}

	public User updateUser(String userName, User updatedUser) {
		User user = userRepository.findByUsername(userName);

		user.setIsAdmin(updatedUser.getIsAdmin());
		user.setFullName(updatedUser.getFullName());

		if (user.getIsAdmin()) {
			user.setRoles(roleRepository.findAllByName("ROLE_ADMIN"));
		} else {
			user.setRoles(roleRepository.findAllByName("ROLE_USER"));
		}
		return userRepository.save(user);
	}

	public void deleteUserByUserName(String userName) {
		userRepository.delete(userRepository.findByUsername(userName));
	}

	// PROJECTS
	public Iterable<Project> findAllProjectsByUser(String userName) {
		User user = userRepository.findByUsername(userName);

		if (user == null) {
			throw new UsernameNotFoundException("Username  '" + userName + "' not found");
		}
		return projectRepository.findByProjectLeader(userName);

	}

	public Iterable<Project> findAllProjects() {
		return projectRepository.findAll();

	}

	public Project findProjectByIndentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if (project == null) {
			throw new ProjectNotFoundException("Project ID '" + projectId.toUpperCase() + "' not found");
		}
		return project;
	}

	public Project UpdateProject(Project project) {
		Project oldProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
		if (oldProject == null) {
			throw new ProjectNotFoundException("Project ID '" + project.getProjectIdentifier() + "' not found");
		}
		project.setProjectLeader(oldProject.getProjectLeader());
		return projectRepository.save(project);
	}

	public void DeleteProjectByIdentifer(String projectId) {
		projectRepository.delete(projectRepository.findByProjectIdentifier(projectId));
	}

	// PROJECT_TASKS
	public Iterable<ProjectTask> findBacklogById(String projectIndentifier) {

		return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIndentifier);
	}

	public ProjectTask findPTByProjectSequence(String backlog_id, String sequence_id) {
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence_id);
		if (projectTask == null) {
			throw new ProjectNotFoundException("Project Task: '" + sequence_id + "' not found");
		}

		if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException(
					"Project Task: '" + sequence_id + "' does not exist in project: '" + backlog_id + "'");
		}
		return projectTaskRepository.findByProjectSequence(sequence_id);
	}

	public ProjectTask updatePTByProjectSequence(ProjectTask updatedTask, String backlog_id, String sequence_id) {
		ProjectTask oldTask = findPTByProjectSequence(backlog_id, sequence_id);

		updatedTask.setProjectIdentifier(backlog_id);
		updatedTask.setProjectSequence(sequence_id);
		updatedTask.setCreated_At(oldTask.getCreated_At());

		if (updatedTask.getPriority() == null || updatedTask.getPriority() == 0) {
			updatedTask.setPriority(3);
		}
		if (updatedTask.getStatus() == "" || updatedTask.getStatus() == null) {
			updatedTask.setStatus("TO_DO");
		}
		return projectTaskRepository.save(updatedTask);
	}

	public void deletePTByProjectSequence(String backlog_id, String sequence_id) {
		projectTaskRepository.delete(findPTByProjectSequence(backlog_id, sequence_id));
	}

}
