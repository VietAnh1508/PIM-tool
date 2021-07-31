package com.elca.backend.service;

import com.elca.backend.dto.GroupDto;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Group;

public interface GroupService {

	Group createGroup(GroupDto groupDto) throws RecordNotFoundException;

	Group updateGroup(Long id, GroupDto groupDto) throws RecordNotFoundException;

}
