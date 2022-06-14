package org.amg.iracingplanner.dao;

import com.google.gson.Gson;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import org.amg.iracingplanner.objet.Series;
import org.amg.iracingplanner.objet.SeriesList;

public class SeriesDAO {

    // URL : https://members.iracing.com/membersite/member/GetSeasons

    // Constants
    private static final String SERIES_FILE = "build\\libs\\series\\series.json";


    // Method to get all series
    public List<Series> findAll() {
        try {
            SeriesList series = new Gson().fromJson(new FileReader(SERIES_FILE), SeriesList.class);
            return series.getSeries();
        } catch (FileNotFoundException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot parse series file" + SERIES_FILE + " - " + e);
        }
        return new ArrayList<>();
    }

}
