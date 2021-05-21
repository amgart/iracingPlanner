package org.amg.iRacingPlanner.view;

import org.amg.iRacingPlanner.dao.ContentDAO;
import org.amg.iRacingPlanner.dao.SerieDAO;
import org.amg.iRacingPlanner.objet.Content;
import org.amg.iRacingPlanner.objet.Event;
import org.amg.iRacingPlanner.objet.Serie;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class DashboardView extends JPanel {


    // Constructor
    DashboardView(String carContentFile, String ownedCarContentFile, String trackContentFile, String ownedTrackContentFile) {
        ContentDAO carContentDao = new ContentDAO(carContentFile, ownedCarContentFile);
        ContentDAO trackContentDao = new ContentDAO(trackContentFile, ownedTrackContentFile);
        SerieDAO serieDAO = new SerieDAO(carContentDao, trackContentDao);
        List<Serie> seriesList = serieDAO.findAll();
        JPanel dashboardPanel = new JPanel(new GridLayout(seriesList.size() + 1,1));
        dashboardPanel.add(createHeaderPanel());
        for (Serie serie : seriesList) {
            dashboardPanel.add(print(serie));
        }

        // Config panel
        dashboardPanel.setPreferredSize(new Dimension(1920, 1080));
        JScrollPane scrollPane = new JScrollPane(dashboardPanel,
                ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        this.add(scrollPane);
        this.setVisible(true);
    }


    // Method to create the header panel
    private JPanel createHeaderPanel() {
        JPanel jPanel = new JPanel(new GridBagLayout());

        // Serie name header column
        JPanel serieNamePanel = new JPanel();
        serieNamePanel.add(new JLabel("Serie"));
        serieNamePanel.setPreferredSize(new Dimension(400, 100));
        jPanel.add(serieNamePanel);

        // Allowed cars header column
        JPanel carsPanel = new JPanel();
        carsPanel.add(new JLabel("Allowed cars"));
        carsPanel.setPreferredSize(new Dimension(200, 100));
        jPanel.add(carsPanel);

        // Events header column
        JPanel eventsPanel = new JPanel();
        eventsPanel.add(new JLabel("Events"));
        eventsPanel.setPreferredSize(new Dimension(1320, 100));
        jPanel.add(eventsPanel);

        jPanel.setPreferredSize(new Dimension(1920, 100));
        return jPanel;
    }


    // Create the JPanel for each serie
    private JPanel print(Serie serie) {
        JPanel seriePanel = new JPanel(new GridBagLayout());

        // Serie name panel
        JPanel serieNamePanel = new JPanel();
        JLabel serieNameLabel = new JLabel(serie.getName());
        serieNamePanel.add(serieNameLabel);
        serieNamePanel.setPreferredSize(new Dimension(400, 100));
        seriePanel.add(serieNamePanel);

        // Allowed cars panel
        JPanel carsPanel = new JPanel();
        carsPanel.add(createCarsPanel(serie.getCars()));
        carsPanel.setPreferredSize(new Dimension(200, 100));
        seriePanel.add(carsPanel);

        // Events panel
        JPanel eventsPanel = new JPanel();
        eventsPanel.add(createEventsPanel(serie.getEvents()));
        eventsPanel.setPreferredSize(new Dimension(1320, 100));
        seriePanel.add(eventsPanel);

        return seriePanel;
    }


    // Create the JPanel for allowed cars in serie
    private JPanel createCarsPanel(List<Content> carList) {
        JPanel carPanel = new JPanel();
        for (Content content : carList) {
            JLabel label = new JLabel(content.getName());
            carPanel.add(label);
        }
        return carPanel;
    }


    // Create the JPanel for events
    private JPanel createEventsPanel(List<Event> eventList) {
        JPanel seriesPanel = new JPanel();
        for (Event event : eventList) {
            JLabel label = new JLabel(event.getStartDate());
            JLabel label2 = new JLabel(event.getTrack().getName());
            seriesPanel.add(label);
            seriesPanel.add(label2);
        }
        return seriesPanel;
    }
}
