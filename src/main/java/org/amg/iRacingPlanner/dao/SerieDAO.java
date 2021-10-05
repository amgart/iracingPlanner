package org.amg.iRacingPlanner.dao;

import com.google.gson.Gson;
import java.io.FileNotFoundException;
import java.io.FileReader;
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
            Series series = new Gson().fromJson(new FileReader(SERIES_FILE), Series.class);
            return series.getSeries();
        } catch (FileNotFoundException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot parse series file" + SERIES_FILE + " - " + e);
        }
        return new ArrayList<>();
    }

}
