package org.amg.iracingplanner.dao;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.amg.iracingplanner.objet.Car;
import org.amg.iracingplanner.objet.Content;

public class CarDAO extends ContentDAO {


    // Constructor
    public CarDAO(String ownedContentFile) {
        super(ownedContentFile);
    }


    // Method that gets all cars
    public List<Content> findAll() {
        try {
            ensureFileExists(this.ownedContentFile);
            List<Car> carList = new SeriesDAO().findAll().stream()
                    .flatMap(item -> item.getCars().stream())
                    .peek(car -> car.setName(java.net.URLDecoder.decode(car.getName(), StandardCharsets.UTF_8)))
                    .distinct()
                    .sorted(Comparator.comparing(Car::getName))
                    .collect(Collectors.toList());
            List<Car> ownedCarList = read(this.ownedContentFile);
            return parse(carList, ownedCarList);
        } catch (IOException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot find content");
        }
        return new ArrayList<>();
    }


    // Parse data to content object
    private List<Content> parse(List<Car> allContent, List<Car> ownedContent) {
        List<Content> contentList = new ArrayList<>();
        allContent.forEach(item -> {
            Content content = convertToContent(item);
            if (ownedContent.stream().anyMatch(owned -> owned.getId() == item.getId())) {
                content.setOwned(true);
            }
            contentList.add(content);
        });
        return contentList;
    }


    // Convert car to content
    private Content convertToContent(Car car) {
        return new Content(car.getId(), car.getName(), false, false);
    }


    // Read file
    private List<Car> read(String file) throws IOException {
        List<Car> carList = new ArrayList<>();
        Files.lines(Paths.get(file)).forEach( line -> carList.add(convertToCar(line)));
        return carList;
    }


    // Method that converts a line in the file to a car object
    private Car convertToCar(String line) {
        String[] fields = line.split(",");
        return new Car(fields[1], Integer.parseInt(fields[0]));
    }

}
