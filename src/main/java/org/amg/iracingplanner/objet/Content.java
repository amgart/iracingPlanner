package org.amg.iracingplanner.objet;

import java.util.Objects;

public class Content {

    // Attributes
    private int id;
    private String name;
    private boolean defaultContent;
    private boolean owned;


    // Constructor
    public Content(int id, String name, boolean defaultContent, boolean owned) {
        this.id = id;
        this.name = name;
        this.defaultContent = defaultContent;
        this.owned = owned;
    }


    // Getters && Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
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


    @Override
    public String toString() {
        return id + "," + name;
    }
}
