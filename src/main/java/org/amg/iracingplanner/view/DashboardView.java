package org.amg.iracingplanner.view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import org.amg.iracingplanner.objet.Car;
import org.amg.iracingplanner.objet.Category;
import org.amg.iracingplanner.objet.Content;
import org.amg.iracingplanner.objet.License;
import org.amg.iracingplanner.objet.Series;
import org.amg.iracingplanner.objet.Track;

public class DashboardView extends JPanel {

    // Constants
    private static final int LINE_HEIGHT = 30;
    private static final int SCREEN_WIDTH = 1900;
    private static final int SCREEN_HEIGHT = 970;
    private static final int SERIES_WIDTH = 300;
    private static final int TYPE_WIDTH = 100;
    private static final int LICENSE_WIDTH = 50;
    private static final int CARS_WIDTH = 300;
    private static final int MISSING_EVENTS_WIDTH = 100;
    private static final int EVENT_WIDTH = 300;
    private static final int EVENTS_WIDTH = 13*EVENT_WIDTH;
    private static final int FULL_WIDTH = SERIES_WIDTH + CARS_WIDTH + MISSING_EVENTS_WIDTH + EVENTS_WIDTH;

    // Attributes
    private List<Series> seriesList;
    private List<Content> carContentList;
    private Map<String, List<Content>> trackMap;


    // Constructor
    DashboardView(List<Series> seriesList, List<Content> carContentList, Map<String, List<Content>> trackMap) {
        this.seriesList = seriesList;
        this.carContentList = carContentList;
        this.trackMap = trackMap;
        init();
    }

    public void init() {

        this.removeAll();

        // Create panel
        JPanel dashboardPanel = new JPanel();
        dashboardPanel.add(createHeaderPanel());
        dashboardPanel.add(createSeriesPanel());
        dashboardPanel.setPreferredSize(new Dimension(FULL_WIDTH, calculateSeriesHeight()));

        // Config panel
        JScrollPane scrollPane = new JScrollPane(dashboardPanel);
        scrollPane.setPreferredSize(new Dimension(SCREEN_WIDTH, SCREEN_HEIGHT));
        this.add(scrollPane, BorderLayout.CENTER);
        this.setVisible(true);
    }


    // Method to create the series panel
    private JPanel createSeriesPanel() {
        JPanel seriesPanel = new JPanel();
        this.seriesList.forEach(series -> seriesPanel.add(print(series)));
        seriesPanel.setPreferredSize(new Dimension(FULL_WIDTH, calculateSeriesHeight()));
        return seriesPanel;
    }


    private int calculateSeriesHeight() {
        return (LINE_HEIGHT + 4)* (int) this.seriesList.stream().mapToLong(item -> item.getCars().size()).sum();
    }


    // Method to create the header panel
    private JPanel createHeaderPanel() {
        JPanel jPanel = new JPanel(new GridBagLayout());

        // Series name header column
        JPanel seriesNamePanel = new JPanel();
        seriesNamePanel.add(new JLabel("Series"));
        seriesNamePanel.setPreferredSize(new Dimension(SERIES_WIDTH, LINE_HEIGHT));
        seriesNamePanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(seriesNamePanel);

        // License column
        JPanel licensePanel = new JPanel();
        licensePanel.add(new JLabel("Class"));
        licensePanel.setPreferredSize(new Dimension(LICENSE_WIDTH, LINE_HEIGHT));
        licensePanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(licensePanel);

        // Series type column
        JPanel typePanel = new JPanel();
        typePanel.add(new JLabel("Type"));
        typePanel.setPreferredSize(new Dimension(TYPE_WIDTH, LINE_HEIGHT));
        typePanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(typePanel);

        // Allowed cars header column
        JPanel carsPanel = new JPanel();
        carsPanel.add(new JLabel("Allowed cars"));
        carsPanel.setPreferredSize(new Dimension(CARS_WIDTH, LINE_HEIGHT));
        carsPanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(carsPanel);

        // Missing events column
        JPanel missingEventsPanel = new JPanel();
        missingEventsPanel.add(new JLabel("Missing events"));
        missingEventsPanel.setPreferredSize(new Dimension(MISSING_EVENTS_WIDTH, LINE_HEIGHT));
        missingEventsPanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(missingEventsPanel);

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


    // Create the JPanel for each series
    private JPanel print(Series series) {
        JPanel seriesPanel = new JPanel(new GridBagLayout());
        int panelHeight = LINE_HEIGHT* series.getCars().size();

        // Series name panel
        JPanel seriesNamePanel = new JPanel(new BorderLayout());
        JLabel seriesNameLabel = new JLabel(java.net.URLDecoder.decode(series.getSeriesName(), StandardCharsets.UTF_8));
        seriesNamePanel.add(seriesNameLabel, BorderLayout.LINE_START);
        seriesNamePanel.setPreferredSize(new Dimension(SERIES_WIDTH, panelHeight));
        seriesNamePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriesPanel.add(seriesNamePanel);

        // License type panel
        JPanel licensePanel = new JPanel(new BorderLayout());
        JLabel licenseLabel = new JLabel(License.valueOf(series.getMinLicenseLevel()));
        licensePanel.add(licenseLabel, BorderLayout.LINE_START);
        licensePanel.setPreferredSize(new Dimension(LICENSE_WIDTH, panelHeight));
        licensePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriesPanel.add(licensePanel);

        // Series type panel
        JPanel seriesTypePanel = new JPanel(new BorderLayout());
        JLabel seriesTypeLabel = new JLabel(Category.valueOf(series.getCategory()));
        seriesTypePanel.add(seriesTypeLabel, BorderLayout.LINE_START);
        seriesTypePanel.setPreferredSize(new Dimension(TYPE_WIDTH, panelHeight));
        seriesTypePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriesPanel.add(seriesTypePanel);

        // Allowed cars panel
        boolean allowedCarOwned = ownedCarInSeries(series, this.carContentList);
        JPanel carsPanel = new JPanel(new BorderLayout());
        carsPanel.add(createCarsPanel(series.getCars(), allowedCarOwned), BorderLayout.LINE_START);
        carsPanel.setPreferredSize(new Dimension(CARS_WIDTH, panelHeight));
        carsPanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        if (allowedCarOwned) {
            carsPanel.setBackground(Color.GREEN);
        }
        seriesPanel.add(carsPanel);

        // Missing events panel
        boolean participationComplete = calculateParticipation(series);
        JPanel missingEventsPanel = new JPanel(new BorderLayout());
        missingEventsPanel.add(createMissingEventsPanel(series));
        missingEventsPanel.setPreferredSize(new Dimension(MISSING_EVENTS_WIDTH, panelHeight));
        missingEventsPanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        if (participationComplete) {
            missingEventsPanel.setBackground(Color.GREEN);
        }
        seriesPanel.add(missingEventsPanel);

        // Events panel
        series.getTracks().forEach(track -> {
            track.setName(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8));
            boolean ownedTrack = this.trackMap.get(track.getName()).stream()
                    .filter(item -> item.getId() == track.getId())
                    .findFirst()
                    .get()
                    .isOwned();
            seriesPanel.add(createEventPanel(track, panelHeight, ownedTrack));
        });
        seriesPanel.setPreferredSize(new Dimension(FULL_WIDTH, panelHeight));
        return seriesPanel;
    }


    private JPanel createMissingEventsPanel(Series series) {
        JPanel panel = new JPanel();
        int ownedEvents = (int) series.getTracks().stream().filter(track ->
                this.trackMap.get(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8)).stream()
                        .filter(item -> item.getId() == track.getId())
                        .findFirst()
                        .get()
                        .isOwned()
        ).count();
        JLabel label = new JLabel(String.valueOf(12 - ownedEvents));
        panel.setPreferredSize(new Dimension(EVENT_WIDTH, LINE_HEIGHT));
        panel.add(label);
        if (calculateParticipation(series)) {
            panel.setBackground(Color.GREEN);
        }
        return panel;
    }


    private boolean calculateParticipation(Series series) {
        int ownedEvents = (int) series.getTracks().stream().filter(track ->
                this.trackMap.get(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8)).stream()
                .filter(item -> item.getId() == track.getId())
                .findFirst()
                .get()
                .isOwned()
        ).count();
        if (ownedEvents == 0) {
            return false;
        }
        return ownedEvents >= 8;
    }


    // Check if there is some car owned in the series
    private boolean ownedCarInSeries(Series series, List<Content> carContentList) {
        AtomicBoolean allowedCarOwned = new AtomicBoolean(false);
        series.getCars().forEach(car -> {
            if (carContentList.stream().filter(item -> item.getId() == car.getId()).findFirst().get().isOwned()) {
                allowedCarOwned.set(true);
            }
        });
        return allowedCarOwned.get();
    }


    // Create the JPanel for allowed cars in series
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


    // Getters & Setters
    public void setSeriesList(List<Series> seriesList) {
        this.seriesList = seriesList;
    }

    public void setCarContentList(List<Content> carContentList) {
        this.carContentList = carContentList;
    }

    public void setTrackMap(Map<String, List<Content>> trackMap) {
        this.trackMap = trackMap;
    }
}
