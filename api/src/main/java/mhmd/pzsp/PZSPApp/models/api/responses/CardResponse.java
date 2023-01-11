package mhmd.pzsp.PZSPApp.models.api.responses;


import com.fasterxml.jackson.annotation.JsonIgnore;
import mhmd.pzsp.PZSPApp.models.Card;

import java.util.ArrayList;
import java.util.List;

public class CardResponse {
    // nie zwracamy Card bo nie chcemy zwracać danych usera przy każdej karcie
    public Long id;

    public String question;

    public String answer;

    public String source;

    public String username;

    public boolean isPublic;

    public List<String> tags;

    public List<String> groups;

    public CardResponse() { }

    @JsonIgnore
    public CardResponse(Card card){
        id = card.getId();
        question = card.getQuestion();
        answer = card.getAnswer();
        source = card.getSource();
        username = card.getUser().getUsername();
        isPublic = card.IsPublic();
        tags = new ArrayList<>();
        groups = new ArrayList<>();

        card.tags.forEach(tag -> tags.add(tag.getName()));
        card.groups.forEach(group -> groups.add(group.getName()));
    }
}
