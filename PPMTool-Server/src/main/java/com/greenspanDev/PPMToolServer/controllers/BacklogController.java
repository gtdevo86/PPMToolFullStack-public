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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenspanDev.PPMToolServer.models.ProjectTask;
import com.greenspanDev.PPMToolServer.services.MapValidationErrorService;
import com.greenspanDev.PPMToolServer.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
@PreAuthorize("hasRole('USER')")
public class BacklogController {

	@Autowired
	private ProjectTaskService projectTaskService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
			@PathVariable String backlog_id, Authentication auth) {

		ResponseEntity<?> ErrorMap = mapValidationErrorService.MapValidationService(result);
		if (ErrorMap != null)
			return ErrorMap;

		ProjectTask myProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask, auth);
		return new ResponseEntity<ProjectTask>(myProjectTask, HttpStatus.CREATED);
	}

	@GetMapping("/{backlog_id}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id, Authentication auth) {
		return projectTaskService.findBacklogById(backlog_id, auth);
	}

	@GetMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id,
			Authentication auth) {
		ProjectTask projectTask = projectTaskService.findPTByProjectSequence(backlog_id, pt_id, auth);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}

	@PatchMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
			@PathVariable String backlog_id, @PathVariable String pt_id, Authentication auth) {

		ResponseEntity<?> ErrorMap = mapValidationErrorService.MapValidationService(result);
		if (ErrorMap != null)
			return ErrorMap;

		projectTaskService.updateByProjectSequence(projectTask, backlog_id, pt_id, auth);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);

	}

	@DeleteMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id,
			Authentication auth) {
		projectTaskService.deletePTByProjectSequence(backlog_id, pt_id, auth);
		return new ResponseEntity<String>("Project Task " + pt_id + " was deleted successfully", HttpStatus.OK);
	}
}
