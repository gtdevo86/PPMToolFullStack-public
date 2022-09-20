package com.greenspanDev.PPMToolServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.greenspanDev.PPMToolServer.exceptions.ProjectNotFoundException;
import com.greenspanDev.PPMToolServer.models.Backlog;
import com.greenspanDev.PPMToolServer.models.ProjectTask;
import com.greenspanDev.PPMToolServer.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	@Autowired
	ProjectService projectService;

	public ProjectTask addProjectTask(String projectIndentifier, ProjectTask projectTask, Authentication auth) {

		Backlog backlog = projectService.findProjectByIndentifier(projectIndentifier, auth).getBacklog();
		projectTask.setBacklog(backlog);

		Integer backLogSequence = backlog.getPTSequence();
		backLogSequence++;

		backlog.setPTSequence(backLogSequence);

		projectTask.setProjectSequence(projectIndentifier + "-" + backLogSequence);
		projectTask.setProjectIdentifier(projectIndentifier);

		if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
			projectTask.setPriority(3);
		}
		if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
			projectTask.setStatus("TO_DO");
		}
		return projectTaskRepository.save(projectTask);
	}

	public Iterable<ProjectTask> findBacklogById(String projectIndentifier, Authentication auth) {

		projectService.findProjectByIndentifier(projectIndentifier, auth);
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIndentifier);
	}

	public ProjectTask findPTByProjectSequence(String backlog_id, String sequence_id, Authentication auth) {
		projectService.findProjectByIndentifier(backlog_id, auth);
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

	public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String sequence_id,
			Authentication auth) {
		ProjectTask oldTask = findPTByProjectSequence(backlog_id, sequence_id, auth);

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

	public void deletePTByProjectSequence(String backlog_id, String sequence_id, Authentication auth) {
		projectTaskRepository.delete(findPTByProjectSequence(backlog_id, sequence_id, auth));
	}
}
