package org.amg.iRacingPlanner.objet;

import java.util.Objects;

public class Car {

    // Attributes
    private String name;
    private int id;


    // Constructor
    public Car(String name, int id) {
        this.name = name;
        this.id = id;
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return id == car.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
