package mhmd.pzsp.PZSPApp.interfaces;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
import mhmd.pzsp.PZSPApp.models.Tag;

import java.util.List;

public interface ITagService {
    List<Tag> findOrCreateTag(List<String> tagNames) throws BackendSqlException, BackendException;
}
