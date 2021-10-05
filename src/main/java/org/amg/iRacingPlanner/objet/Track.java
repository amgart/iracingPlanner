package org.amg.iRacingPlanner.objet;

import java.util.Objects;

public class Track {

    // Attributes
    private String name;
    private int id;
    private int raceweek;
    private String config;


    public Track(String name, int id, int raceweek, String config) {
        this.name = name;
        this.id = id;
        this.raceweek = raceweek;
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

    public int getRaceweek() {
        return raceweek;
    }

    public void setRaceweek(int raceweek) {
        this.raceweek = raceweek;
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
