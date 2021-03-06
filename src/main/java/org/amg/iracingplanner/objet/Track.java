package org.amg.iracingplanner.objet;

import java.util.Objects;

public class Track {

    // Attributes
    private String name;
    private int id;
    private int raceWeek;
    private String config;


    public Track(String name, int id, int raceWeek, String config) {
        this.name = name;
        this.id = id;
        this.raceWeek = raceWeek;
        this.config = config;
    }


    // Getters & Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRaceWeek() {
        return raceWeek;
    }

    public void setRaceWeek(int raceWeek) {
        this.raceWeek = raceWeek;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Track track = (Track) o;
        return id == track.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
