package com.greenspanDev.PPMToolServer.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenspanDev.PPMToolServer.models.Project;
import com.greenspanDev.PPMToolServer.services.MapValidationErrorService;
import com.greenspanDev.PPMToolServer.services.ProjectService;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
@PreAuthorize("hasRole('USER')")
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result,
			Authentication auth) {
		ResponseEntity<?> ErrorMap = mapValidationErrorService.MapValidationService(result);
		if (ErrorMap != null)
			return ErrorMap;
		Project myProject = projectService.saveOrUpdateProject(project, auth);
		return new ResponseEntity<Project>(myProject, HttpStatus.CREATED);
	}

	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable String projectId, Authentication auth) {
		Project project = projectService.findProjectByIndentifier(projectId, auth);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	@GetMapping("/all")

	public Iterable<Project> getAllProjects(Authentication auth) {
		return projectService.findAllProjects(auth);
	}

	@DeleteMapping("/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectId, Authentication auth) {
		projectService.deleteProjectByIdentifier(projectId, auth);
		return new ResponseEntity<String>("Project with ID: '" + projectId + "' was deleted", HttpStatus.OK);
	}

}
