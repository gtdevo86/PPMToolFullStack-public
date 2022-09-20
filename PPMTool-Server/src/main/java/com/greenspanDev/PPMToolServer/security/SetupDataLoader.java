package com.greenspanDev.PPMToolServer.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.greenspanDev.PPMToolServer.models.Privilege;
import com.greenspanDev.PPMToolServer.models.Role;
import com.greenspanDev.PPMToolServer.models.User;
import com.greenspanDev.PPMToolServer.repositories.PrivilegeRepository;
import com.greenspanDev.PPMToolServer.repositories.RoleRepository;
import com.greenspanDev.PPMToolServer.repositories.UserRepository;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

	@Value("${alreadySetup}")
	boolean alreadySetup;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PrivilegeRepository privilegeRepository;

	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	@Override
	@Transactional
	public void onApplicationEvent(ContextRefreshedEvent event) {
		if (alreadySetup)
			return;
		Privilege readOwnPrivilege = createPrivilegeIfNotFound("READ_OWN_PRIVILEGE");
		Privilege readAllPrivilege = createPrivilegeIfNotFound("READ_All_PRIVILEGE");
		Privilege writeOwnPrivilege = createPrivilegeIfNotFound("WRITE_OWN_PRIVILEGE");
		Privilege writeAllPrivilege = createPrivilegeIfNotFound("WRITE_All_PRIVILEGE");
		Privilege deleteOwnPrivilege = createPrivilegeIfNotFound("DELETE_OWN_PRIVILEGE");
		Privilege deleteAllPrivilege = createPrivilegeIfNotFound("DELETE_All_PRIVILEGE");
		Privilege makeAdminPrivilege = createPrivilegeIfNotFound("MAKE_ADMIN_PRIVILEGE");

		List<Privilege> adminPrivileges = Arrays.asList(readAllPrivilege, writeAllPrivilege, deleteAllPrivilege,
				makeAdminPrivilege);
		List<Privilege> userPrivileges = Arrays.asList(readOwnPrivilege, writeOwnPrivilege, deleteOwnPrivilege);

		createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
		createRoleIfNotFound("ROLE_USER", userPrivileges);

		Role adminRole = roleRepository.findByName("ROLE_ADMIN");
		User user = new User();
		user.setFullName("Admin");
		user.setUsername("admin@example.com");
		user.setIsAdmin(true);
		user.setPassword(bcryptPasswordEncoder.encode("password"));
		user.setRoles(Arrays.asList(adminRole));
		userRepository.save(user);

		alreadySetup = true;
	}

	@Transactional
	Privilege createPrivilegeIfNotFound(String name) {

		Privilege privilege = privilegeRepository.findByName(name);
		if (privilege == null) {
			privilege = new Privilege(name);
			privilegeRepository.save(privilege);
		}
		return privilege;
	}

	@Transactional
	Role createRoleIfNotFound(String name, Collection<Privilege> privileges) {

		Role role = roleRepository.findByName(name);
		if (role == null) {
			role = new Role(name);
			role.setPrivileges(privileges);
			roleRepository.save(role);
		}
		return role;
	}

}
