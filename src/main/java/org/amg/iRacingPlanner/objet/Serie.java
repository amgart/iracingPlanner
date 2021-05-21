package org.amg.iRacingPlanner.objet;

import java.util.List;
import java.util.Objects;

public class Serie {

    // Attributes
    private String name;
    private List<Content> cars;
    private List<Event> events;

    // Getters && Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Content> getCars() {
        return cars;
    }

    public void setCars(List<Content> cars) {
        this.cars = cars;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Serie serie = (Serie) o;
        return name.equals(serie.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
