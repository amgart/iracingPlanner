package org.amg.iRacingPlanner.view;

import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import javax.swing.*;
import org.amg.iRacingPlanner.objet.Car;
import org.amg.iRacingPlanner.objet.Content;
import org.amg.iRacingPlanner.objet.Serie;
import org.amg.iRacingPlanner.objet.Track;

public class DashboardView extends JPanel {

    // Constants
    private static final int LINE_HEIGHT = 30;
    private static final int SCREEN_WIDTH = 1920;
    private static final int SCREEN_HEIGHT = 900;
    private static final int SERIE_WIDTH = 300;
    private static final int CARS_WIDTH = 300;
    private static final int EVENT_WIDTH = 300;
    private static final int EVENTS_WIDTH = 13*EVENT_WIDTH;
    private static final int FULL_WIDTH = SERIE_WIDTH + CARS_WIDTH + EVENTS_WIDTH;


    // Constructor
    DashboardView(List<Serie> seriesList, List<Content> carContentList, Map<String, List<Content>> trackMap) {

        // Create panel
        JPanel dashboardPanel = new JPanel();
        dashboardPanel.add(createHeaderPanel());
        dashboardPanel.add(createSeriesPanel(seriesList, carContentList, trackMap));
        dashboardPanel.setPreferredSize(new Dimension(FULL_WIDTH, calculateSeriesHeight(seriesList)));

        // Config panel
        JScrollPane scrollPane = new JScrollPane(dashboardPanel);
        scrollPane.setPreferredSize(new Dimension(SCREEN_WIDTH, SCREEN_HEIGHT));
        this.add(scrollPane, BorderLayout.CENTER);
        this.setVisible(true);
    }


    // Method to create the series panel
    private JPanel createSeriesPanel(List<Serie> seriesList, List<Content> carContentList,
                                     Map<String, List<Content>> trackMap) {
        JPanel seriesPanel = new JPanel();
        seriesList.forEach(serie -> seriesPanel.add(print(serie, carContentList, trackMap)));
        seriesPanel.setPreferredSize(new Dimension(FULL_WIDTH, calculateSeriesHeight(seriesList)));
        return seriesPanel;
    }


    private int calculateSeriesHeight(List<Serie> seriesList) {
        return LINE_HEIGHT*seriesList.stream().flatMap(item -> item.getCars().stream()).collect(Collectors.toList()).size();
    }


    // Method to create the header panel
    private JPanel createHeaderPanel() {
        JPanel jPanel = new JPanel(new GridBagLayout());

        // Serie name header column
        JPanel serieNamePanel = new JPanel();
        serieNamePanel.add(new JLabel("Serie"));
        serieNamePanel.setPreferredSize(new Dimension(SERIE_WIDTH, LINE_HEIGHT));
        serieNamePanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(serieNamePanel);

        // Allowed cars header column
        JPanel carsPanel = new JPanel();
        carsPanel.add(new JLabel("Allowed cars"));
        carsPanel.setPreferredSize(new Dimension(CARS_WIDTH, LINE_HEIGHT));
        carsPanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(carsPanel);

        // Events header column
        for (int num : Arrays.asList(1,2,3,4,5,6,7,8,9,10,11,12)) {
            jPanel.add(buildEventPanel("Week " + num));
        }
        jPanel.setPreferredSize(new Dimension(FULL_WIDTH, LINE_HEIGHT));
        return jPanel;
    }


    // Create an event panel
    private JPanel buildEventPanel(String name) {
        JPanel eventsPanel = new JPanel();
        eventsPanel.add(new JLabel(name));
        eventsPanel.setBorder(BorderFactory.createLoweredBevelBorder());
        eventsPanel.setPreferredSize(new Dimension(EVENT_WIDTH, LINE_HEIGHT));
        return eventsPanel;
    }


    // Create the JPanel for each serie
    private JPanel print(Serie serie, List<Content> carContentList, Map<String, List<Content>> trackMap) {
        JPanel seriePanel = new JPanel(new GridBagLayout());
        int panelHeight = LINE_HEIGHT*serie.getCars().size();

        // Serie name panel
        JPanel serieNamePanel = new JPanel(new BorderLayout());
        JLabel serieNameLabel = new JLabel(java.net.URLDecoder.decode(serie.getSeriesname(), StandardCharsets.UTF_8));
        serieNamePanel.add(serieNameLabel, BorderLayout.LINE_START);
        serieNamePanel.setPreferredSize(new Dimension(SERIE_WIDTH, panelHeight));
        serieNamePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriePanel.add(serieNamePanel);

        // Allowed cars panel
        boolean allowedCarOwned = ownedCarInSerie(serie, carContentList);
        JPanel carsPanel = new JPanel(new BorderLayout());
        carsPanel.add(createCarsPanel(serie.getCars(), allowedCarOwned), BorderLayout.LINE_START);
        carsPanel.setPreferredSize(new Dimension(CARS_WIDTH, panelHeight));
        carsPanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        if (allowedCarOwned) {
            carsPanel.setBackground(Color.GREEN);
        }
        seriePanel.add(carsPanel);

        // Events panel
        serie.getTracks().forEach(track -> {
            track.setName(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8));
            boolean ownedTrack = trackMap.get(track.getName()).stream()
                    .filter(item -> item.getId() == track.getId())
                    .findFirst()
                    .get().isOwned();
            seriePanel.add(createEventPanel(track, panelHeight, ownedTrack));
        });
        seriePanel.setPreferredSize(new Dimension(FULL_WIDTH, panelHeight));
        return seriePanel;
    }


    // Check if there is some car owned in the serie
    private boolean ownedCarInSerie(Serie serie, List<Content> carContentList) {
        AtomicBoolean allowedCarOwned = new AtomicBoolean(false);
        serie.getCars().forEach(car -> {
            if (carContentList.stream().filter(item -> item.getId() == car.getId()).findFirst().get().isOwned()) {
                allowedCarOwned.set(true);
            }
        });
        return allowedCarOwned.get();
    }


    // Create the JPanel for allowed cars in serie
    private JPanel createCarsPanel(List<Car> carList, boolean allowedCarOwned) {
        JPanel carPanel = new JPanel(new GridLayout(carList.size(), 1));
        carList.forEach(car -> {
            JLabel label = new JLabel(java.net.URLDecoder.decode(car.getName(), StandardCharsets.UTF_8));
            carPanel.add(label);
        });
        if (allowedCarOwned) {
            carPanel.setBackground(Color.GREEN);
        }
        return carPanel;
    }


    // Create the JPanel for events
    private JPanel createEventPanel(Track track, int panelHeight, boolean ownedTrack) {
        JPanel panel = new JPanel();
        JLabel label = new JLabel(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8));
        panel.setPreferredSize(new Dimension(EVENT_WIDTH, panelHeight));
        panel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        panel.add(label);
        if (ownedTrack) {
            panel.setBackground(Color.GREEN);
        }
        return panel;
    }
}
