package com.elca.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.elca.backend.dto.SimpleGroupDto;
import com.elca.backend.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long>, JpaSpecificationExecutor<Group> {

	List<SimpleGroupDto> getSimpleGroupsBy();

}
