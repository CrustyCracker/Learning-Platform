package mhmd.pzsp.PZSPApp.services;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
import mhmd.pzsp.PZSPApp.interfaces.ITagService;
import mhmd.pzsp.PZSPApp.models.Tag;
import mhmd.pzsp.PZSPApp.repositories.ITagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static mhmd.pzsp.PZSPApp.security.SecurityHelper.getCurrentUser;


@Service
public class TagService implements ITagService {
    @Autowired
    private ITagRepository tagRepository;

    @Override
    public List<Tag> findOrCreateTag(List<String> tagNames) throws BackendSqlException, BackendException {
        List<Tag> tags = new ArrayList<>();
        if (!tagNames.isEmpty()){
            for (String name: tagNames) {
                var tag = tagRepository.findByName(name);

                if (tag.isPresent())
                    tags.add(tag.get());
                else
                    tags.add(createTag(name));
            }
        }
        return tags;
    }

    private Tag createTag(String name) throws BackendException, BackendSqlException {
        var user = getCurrentUser();
        if (user == null)
            throw new BackendException("Brak zalogowanego użytkownika");

        var tag = new Tag(name, user);

        try {
            return tagRepository.save(tag);
        }
        catch (Exception e) {
            throw new BackendSqlException("Błąd podczas zapisywania tagu");
        }
    }
}