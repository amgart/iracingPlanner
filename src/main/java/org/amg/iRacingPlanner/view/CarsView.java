package org.amg.iRacingPlanner.view;

import org.amg.iRacingPlanner.dao.CarDAO;
import org.amg.iRacingPlanner.objet.Car;

import javax.swing.JCheckBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.ScrollPaneConstants;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.util.List;

public class CarsView extends JPanel {

    // Constructor
    CarsView() {
        JPanel carPanel = new JPanel(new GridLayout(0,3));
        List<Car> carList = new CarDAO().findAllCars();
        for (Car car : carList) {
            carPanel.add(print(car));
        }
        carPanel.setPreferredSize(new Dimension(1400, 800));
        JScrollPane scrollPane = new JScrollPane(carPanel,
                ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        this.add(scrollPane);
        this.setVisible(true);
    }


    // Create the JPanel for each car
    private JPanel print(Car car) {
        JPanel carPanel = new JPanel();
        JLabel carLabel = getCarLabel(car);
        carPanel.add(createCheckBoxFor(car));
        carPanel.add(carLabel);
        return carPanel;
    }


    // Build the car label depending on the attributes
    private JLabel getCarLabel(Car car) {
        JLabel label = new JLabel(car.getName());
        if (car.isDefaultContent()) {
            label.setForeground(Color.GRAY);
        } else if (car.isOwned()) {
            label.setForeground(Color.GREEN);
        }
        return label;
    }


    // Create checkbox
    private JCheckBox createCheckBoxFor(Car car) {
        JCheckBox checkbox = new JCheckBox();
        if (car.isDefaultContent()) {
            checkbox.setSelected(true);
            checkbox.setEnabled(false);
        } else if (car.isOwned()) {
            checkbox.setSelected(true);
        } else {
            checkbox.setSelected(false);
        }
        checkbox.addActionListener(e -> {
            if (checkbox.isSelected()) {
                car.setOwned(true);
            } else {
                car.setOwned(false);
            }
            new CarDAO().save(car);
        });
        return checkbox;
    }

}
