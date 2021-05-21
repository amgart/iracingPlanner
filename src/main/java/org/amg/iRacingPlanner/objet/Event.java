package org.amg.iRacingPlanner.objet;

import java.util.Date;
import java.util.Objects;

public class Event {

    // Attributes
    private String startDate;
    private String endDate;
    private Content track;


    // Getters && Setters
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Content getTrack() {
        return track;
    }

    public void setTrack(Content track) {
        this.track = track;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return startDate.equals(event.startDate) && endDate.equals(event.endDate) && track.equals(event.track);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startDate, endDate, track);
    }
}
