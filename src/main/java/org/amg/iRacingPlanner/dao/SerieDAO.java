package org.amg.iRacingPlanner.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import org.amg.iRacingPlanner.objet.Serie;
import org.amg.iRacingPlanner.objet.Series;

public class SerieDAO {

    // URL : https://members.iracing.com/membersite/member/GetSeasons

    // Constants
    private static final String SERIES_FILE = "build\\libs\\series\\series.json";


    // Method to get all series
    public List<Serie> findAll() {
        try {
            Series series = new ObjectMapper().readValue(SERIES_FILE, Series.class);
            return series.getSeries();
        } catch (JsonProcessingException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot parse series file" + SERIES_FILE + " - " + e);
        }
        return new ArrayList<>();
    }

}
