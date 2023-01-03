package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;

import java.util.List;

public interface IGroupService {
    Group create(NewGroupRequest request, User user) throws BackendException;

    List<Group> findGroupsByUser(Long userId);

    Group findGroupById(Long groupId) throws BackendException;

}
