package com.elca.backend.service;

import com.elca.backend.dto.GroupDto;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Group;

public interface GroupService {

	Group getGroupById(Long id) throws RecordNotFoundException;

	Group createGroup(GroupDto groupDto) throws BadRequestException;

	Group updateGroup(Long id, GroupDto groupDto) throws BadRequestException;

}
