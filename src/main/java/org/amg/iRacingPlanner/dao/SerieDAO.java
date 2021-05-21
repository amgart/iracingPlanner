package org.amg.iRacingPlanner.dao;

import org.amg.iRacingPlanner.objet.Content;
import org.amg.iRacingPlanner.objet.Event;
import org.amg.iRacingPlanner.objet.Serie;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SerieDAO {

    // Attributes
    private final ContentDAO carContentDao;
    private final ContentDAO trackContentDao;


    // Constructor
    public SerieDAO(ContentDAO carContentDao, ContentDAO trackContentDao) {
        this.carContentDao = carContentDao;
        this.trackContentDao = trackContentDao;
    }


    // Method to get all series
    public List<Serie> findAll() {
        List<Serie> seriesList = new ArrayList<>();
        File directory = new File("series");
        File[] fileList = directory.listFiles();
        if (fileList != null) {
            for (File file : fileList) {
                try {
                    seriesList.add(parse(file));
                } catch (FileNotFoundException e) {
                    System.out.println("[iRacingPlanner].[findAll] - Cannot parse series file" + file.getName());
                }
            }
        }
        return seriesList;
    }


    // Method to read the file and convert it to a serie
    private Serie parse(File file) throws FileNotFoundException {
        Serie serie = new Serie();
        String data = read(file);
        String[] lines = data.split("\n");
        serie.setName(lines[0]);
        serie.setCars(parseCars(lines[1]));
        serie.setEvents(parseEvents(lines[2]));
        return serie;
    }


    // Method to parse cars in event
    private List<Content> parseCars(String data) {
        List<Content> carList = new ArrayList<>();
        String[] splitted = data.split(",");
        for (String carId : splitted) {
            try {
                carList.add(carContentDao.findById(carId));
            } catch (FileNotFoundException e) {
                System.out.println("[iRacingPlanner].[parseCars] - Cannot parse cars in serie");
            }
        }
        return carList;
    }


    private List<Event> parseEvents(String data) {
        List<Event> eventList = new ArrayList<>();
        String[] events = data.split("\\|");
        for (String item : events) {
            try {
                String[] attrs = item.split(",");
                Event event = new Event();
                event.setStartDate(attrs[0]);
                event.setEndDate(null);
                event.setTrack(trackContentDao.findById(attrs[1]));
                eventList.add(event);
            } catch (FileNotFoundException e) {
                System.out.println("[iRacingPlanner].[parseEvents] - Cannot parse events in serie");
            }
        }
        return eventList;
    }

    // Read file
    private String read(File file) throws FileNotFoundException {
        BufferedReader reader =  new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        Stream<String> lines = reader.lines();
        String data = lines.collect(Collectors.joining("\n"));
        lines.close();
        return data;
    }

}
