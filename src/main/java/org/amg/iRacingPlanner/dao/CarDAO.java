package org.amg.iRacingPlanner.dao;

import org.amg.iRacingPlanner.objet.Car;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CarDAO {

    // Constants
    private static final String CONF_CARS_TXT = "conf/cars.txt";


    // Method that gets all cars from file
    public List<Car> findAllCars() {
        try {
            String data = read();
            return parse(data);
        } catch (FileNotFoundException e) {

        }
        return null;
    }


    // Method that saves the car into file
    public boolean save(Car car) {
        try {
            String data = read();
            return replaceCarInFile(car, data);
        } catch (FileNotFoundException e) {

        }
        return false;
    }


    // Read file
    private String read() throws FileNotFoundException {
        File carsFile = new File(CONF_CARS_TXT);
        BufferedReader reader =  new BufferedReader(new InputStreamReader(new FileInputStream(carsFile)));
        Stream<String> lines = reader.lines();
        String data = lines.collect(Collectors.joining("\n"));
        lines.close();
        return data;
    }


    // Parse data to Car object
    private List<Car> parse(String data) {
        List<Car> carList = new ArrayList<>();
        String[] lines = data.split("\n");
        for(String line : lines) {
            carList.add(convert(line));
        }
        return carList;
    }

    // Convert the line to Car object
    private Car convert(String line) {
        String[] columns = line.split(",");
        Car car = new Car();
        car.setId(columns[0]);
        car.setName(columns[1]);
        if ("1".equals(columns[2])) {
            car.setDefaultContent(true);
        }
        if ("1".equals(columns[3])) {
            car.setOwned(true);
        }
        return car;
    }


    // Method to replace the old car with the new car in file
    private boolean replaceCarInFile(Car newCar, String data) {
        try {
            String oldCar = findCar(newCar, data);
            String newCarString = buildNewCarString(newCar);
            String newData = data.replace(oldCar, newCarString);
            return saveToFile(newData);
        } catch (IOException e) {

        }
        return false;
    }


    // Method to find a car in the file and returns the string line
    private String findCar(Car car, String data) {
        String[] lines = data.split("\n");
        for(String line : lines) {
            if (convert(line).getId().equals(car.getId())) {
                return line;
            }
        }
        return null;
    }


    // Method that buils the string to save for the given car
    private String buildNewCarString(Car newCar) {
        String line = newCar.getId() + ","+ newCar.getName() + ",";
        if (newCar.isDefaultContent()) {
            line += "1,";
        } else {
            line += "0,";
        }
        if (newCar.isOwned()) {
            line += "1";
        } else {
            line += "0";
        }
        return line;
    }


    // Method that writes the data into file
    private boolean saveToFile(String data) throws IOException {
        File carsFile = new File(CONF_CARS_TXT);
        if (carsFile.exists()) {
            carsFile.delete();
        }
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(CONF_CARS_TXT));
        bufferedWriter.write(data);
        bufferedWriter.close();
        System.out.println("[iRacingPlanner].[saveToFile] - Car properly saved!");
        return true;
    }
}
