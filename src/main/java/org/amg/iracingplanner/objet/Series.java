package org.amg.iracingplanner.objet;

import java.util.List;

public class Series {

    // Attributes
    private String minSr;
    private String seriesName;
    private int seriesId;
    private List<Car> cars;
    private boolean isFixedSetup;
    private List<Track> tracks;
    private boolean multiclass;
    private int category;
    private int minLicenseLevel;


    // Getters && Setters
    public String getMinSr() {
        return minSr;
    }

    public void setMinSr(String minSr) {
        this.minSr = minSr;
    }

    public String getSeriesName() {
        return seriesName;
    }

    public void setSeriesName(String seriesName) {
        this.seriesName = seriesName;
    }

    public int getSeriesId() {
        return seriesId;
    }

    public void setSeriesId(int seriesId) {
        this.seriesId = seriesId;
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

    public int getMinLicenseLevel() {
        return minLicenseLevel;
    }

    public void setMinLicenseLevel(int minLicenseLevel) {
        this.minLicenseLevel = minLicenseLevel;
    }
}
