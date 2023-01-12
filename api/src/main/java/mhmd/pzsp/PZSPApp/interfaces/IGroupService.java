package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
import mhmd.pzsp.PZSPApp.models.Group;
import mhmd.pzsp.PZSPApp.models.User;
import mhmd.pzsp.PZSPApp.models.api.requests.EditGroupRequest;
import mhmd.pzsp.PZSPApp.models.api.requests.NewGroupRequest;

import java.util.List;

public interface IGroupService {
    Group create(NewGroupRequest request, User user) throws BackendException, BackendSqlException;

    List<Group> findGroupsByUser(Long userId);

    Group findGroupById(Long groupId) throws BackendException;

    List<Group> findPublicOrUsers(Long userId);

    Group edit(EditGroupRequest request, User user) throws BackendException, BackendSqlException;

    boolean delete(Long groupId) throws BackendException;
}
