package org.amg.iracingplanner.objet;

import java.util.List;

public class Serie {

    // Attributes
    private String minsr;
    private String seriesname;
    private int seriesid;
    private List<Car> cars;
    private boolean isFixedSetup;
    private List<Track> tracks;
    private boolean multiclass;
    private int category;
    private int minlicenselevel;


    // Getters && Setters
    public String getMinsr() {
        return minsr;
    }

    public void setMinsr(String minsr) {
        this.minsr = minsr;
    }

    public String getSeriesname() {
        return seriesname;
    }

    public void setSeriesname(String seriesname) {
        this.seriesname = seriesname;
    }

    public int getSeriesid() {
        return seriesid;
    }

    public void setSeriesid(int seriesid) {
        this.seriesid = seriesid;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    public boolean isFixedSetup() {
        return isFixedSetup;
    }

    public void setFixedSetup(boolean fixedSetup) {
        isFixedSetup = fixedSetup;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public boolean isMulticlass() {
        return multiclass;
    }

    public void setMulticlass(boolean multiclass) {
        this.multiclass = multiclass;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public int getMinlicenselevel() {
        return minlicenselevel;
    }

    public void setMinlicenselevel(int minlicenselevel) {
        this.minlicenselevel = minlicenselevel;
    }
}
