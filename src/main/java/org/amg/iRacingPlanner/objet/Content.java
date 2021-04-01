package org.amg.iRacingPlanner.objet;

import java.util.Objects;

public class Content {

    // Attributes
    private String id;
    private String name;
    private boolean defaultContent;
    private boolean owned;

    // Getters && Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDefaultContent() {
        return defaultContent;
    }

    public void setDefaultContent(boolean defaultContent) {
        this.defaultContent = defaultContent;
    }

    public boolean isOwned() {
        return owned;
    }

    public void setOwned(boolean owned) {
        this.owned = owned;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Content content = (Content) o;
        return Objects.equals(id, content.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
