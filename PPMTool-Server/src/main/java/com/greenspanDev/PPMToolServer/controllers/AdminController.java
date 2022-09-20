package com.greenspanDev.PPMToolServer.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.greenspanDev.PPMToolServer.models.Project;
import com.greenspanDev.PPMToolServer.models.ProjectTask;
import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.services.AdminService;
import com.greenspanDev.PPMToolServer.services.MapValidationErrorService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@GetMapping("/users")
	public ResponseEntity<Iterable<User>> getAllUsers() {
		Iterable<User> allUsers = adminService.getAllUsers();
		return new ResponseEntity<Iterable<User>>(allUsers, HttpStatus.OK);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id) {
		User user = adminService.getUser(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@GetMapping("/users/{userName}/projects")
	public ResponseEntity<Iterable<Project>> getProjectsByUsername(@PathVariable String userName) {
		Iterable<Project> projects = adminService.findAllProjectsByUser(userName);
		return new ResponseEntity<Iterable<Project>>(projects, HttpStatus.OK);
	}

	@PatchMapping("/users/{userName}")
	public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable String userName) {
		adminService.updateUser(userName, user);

		return new ResponseEntity<String>("User: '" + userName + "' was updated successfully ", HttpStatus.OK);
	}

	@DeleteMapping("/users/{userName}")
	public ResponseEntity<?> deleteUser(@PathVariable String userName) {
		adminService.deleteUserByUserName(userName);
		return new ResponseEntity<String>("User: '" + userName + "' was deleted", HttpStatus.OK);
	}

	@GetMapping("/project/{projectId}")
	public ResponseEntity<Project> getProjectById(@PathVariable String projectId) {
		Project project = adminService.findProjectByIndentifier(projectId);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	@GetMapping("/project")
	public ResponseEntity<Iterable<Project>> getallProjects() {
		Iterable<Project> projects = adminService.findAllProjects();
		return new ResponseEntity<Iterable<Project>>(projects, HttpStatus.OK);
	}

	@PostMapping("/project")
	public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result) {
		ResponseEntity<?> ErrorMap = mapValidationErrorService.MapValidationService(result);
		if (ErrorMap != null)
			return ErrorMap;
		adminService.UpdateProject(project);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	@DeleteMapping("/project/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectId) {
		adminService.DeleteProjectByIdentifer(projectId);
		return new ResponseEntity<String>("Project with ID: '" + projectId + "' was deleted", HttpStatus.OK);
	}

	@GetMapping("/backlog/{backlog_id}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id) {
		return adminService.findBacklogById(backlog_id);
	}

	@GetMapping("/backlog/{backlog_id}/{pt_id}")
	public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id) {
		ProjectTask projectTask = adminService.findPTByProjectSequence(backlog_id, pt_id);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}

	@PatchMapping("/backlog/{backlog_id}/{pt_id}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
			@PathVariable String backlog_id, @PathVariable String pt_id) {

		ResponseEntity<?> ErrorMap = mapValidationErrorService.MapValidationService(result);
		if (ErrorMap != null)
			return ErrorMap;

		adminService.updatePTByProjectSequence(projectTask, backlog_id, pt_id);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}

	@DeleteMapping("/backlog/{backlog_id}/{pt_id}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id) {
		adminService.deletePTByProjectSequence(backlog_id, pt_id);
		return new ResponseEntity<String>("Project Task " + pt_id + " was deleted successfully", HttpStatus.OK);
	}

}
