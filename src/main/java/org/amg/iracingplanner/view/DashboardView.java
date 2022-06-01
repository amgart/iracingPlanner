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
import org.amg.iracingplanner.objet.Serie;
import org.amg.iracingplanner.objet.Track;

public class DashboardView extends JPanel {

    // Constants
    private static final int LINE_HEIGHT = 30;
    private static final int SCREEN_WIDTH = 1900;
    private static final int SCREEN_HEIGHT = 970;
    private static final int SERIE_WIDTH = 300;
    private static final int TYPE_WIDTH = 100;
    private static final int LICENSE_WIDTH = 50;
    private static final int CARS_WIDTH = 300;
    private static final int MISSING_EVENTS_WIDTH = 100;
    private static final int EVENT_WIDTH = 300;
    private static final int EVENTS_WIDTH = 13*EVENT_WIDTH;
    private static final int FULL_WIDTH = SERIE_WIDTH + CARS_WIDTH + MISSING_EVENTS_WIDTH + EVENTS_WIDTH;

    // Attributes
    private List<Serie> seriesList;
    private List<Content> carContentList;
    private Map<String, List<Content>> trackMap;


    // Constructor
    DashboardView(List<Serie> seriesList, List<Content> carContentList, Map<String, List<Content>> trackMap) {
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
        this.seriesList.forEach(serie -> seriesPanel.add(print(serie)));
        seriesPanel.setPreferredSize(new Dimension(FULL_WIDTH, calculateSeriesHeight()));
        return seriesPanel;
    }


    private int calculateSeriesHeight() {
        return (LINE_HEIGHT + 4)* (int) this.seriesList.stream().mapToLong(item -> item.getCars().size()).sum();
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

        // License column
        JPanel liecnsePanel = new JPanel();
        liecnsePanel.add(new JLabel("Class"));
        liecnsePanel.setPreferredSize(new Dimension(LICENSE_WIDTH, LINE_HEIGHT));
        liecnsePanel.setBorder(BorderFactory.createLoweredBevelBorder());
        jPanel.add(liecnsePanel);

        // Serie type column
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


    // Create the JPanel for each serie
    private JPanel print(Serie serie) {
        JPanel seriePanel = new JPanel(new GridBagLayout());
        int panelHeight = LINE_HEIGHT*serie.getCars().size();

        // Serie name panel
        JPanel serieNamePanel = new JPanel(new BorderLayout());
        JLabel serieNameLabel = new JLabel(java.net.URLDecoder.decode(serie.getSeriesname(), StandardCharsets.UTF_8));
        serieNamePanel.add(serieNameLabel, BorderLayout.LINE_START);
        serieNamePanel.setPreferredSize(new Dimension(SERIE_WIDTH, panelHeight));
        serieNamePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriePanel.add(serieNamePanel);

        // License type panel
        JPanel licensePanel = new JPanel(new BorderLayout());
        JLabel licenseLabel = new JLabel(License.valueOf(serie.getMinlicenselevel()));
        licensePanel.add(licenseLabel, BorderLayout.LINE_START);
        licensePanel.setPreferredSize(new Dimension(LICENSE_WIDTH, panelHeight));
        licensePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriePanel.add(licensePanel);

        // Serie type panel
        JPanel serieTypePanel = new JPanel(new BorderLayout());
        JLabel serieTypeLabel = new JLabel(Category.valueOf(serie.getCategory()));
        serieTypePanel.add(serieTypeLabel, BorderLayout.LINE_START);
        serieTypePanel.setPreferredSize(new Dimension(TYPE_WIDTH, panelHeight));
        serieTypePanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        seriePanel.add(serieTypePanel);

        // Allowed cars panel
        boolean allowedCarOwned = ownedCarInSerie(serie, this.carContentList);
        JPanel carsPanel = new JPanel(new BorderLayout());
        carsPanel.add(createCarsPanel(serie.getCars(), allowedCarOwned), BorderLayout.LINE_START);
        carsPanel.setPreferredSize(new Dimension(CARS_WIDTH, panelHeight));
        carsPanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        if (allowedCarOwned) {
            carsPanel.setBackground(Color.GREEN);
        }
        seriePanel.add(carsPanel);

        // Missing events panel
        boolean participationComplete = calculateParticipation(serie);
        JPanel missingEventsPanel = new JPanel(new BorderLayout());
        missingEventsPanel.add(createMissingEventsPanel(serie));
        missingEventsPanel.setPreferredSize(new Dimension(MISSING_EVENTS_WIDTH, panelHeight));
        missingEventsPanel.setBorder(BorderFactory.createRaisedSoftBevelBorder());
        if (participationComplete) {
            missingEventsPanel.setBackground(Color.GREEN);
        }
        seriePanel.add(missingEventsPanel);

        // Events panel
        serie.getTracks().forEach(track -> {
            track.setName(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8));
            boolean ownedTrack = this.trackMap.get(track.getName()).stream()
                    .filter(item -> item.getId() == track.getId())
                    .findFirst()
                    .get().isOwned();
            seriePanel.add(createEventPanel(track, panelHeight, ownedTrack));
        });
        seriePanel.setPreferredSize(new Dimension(FULL_WIDTH, panelHeight));
        return seriePanel;
    }


    private JPanel createMissingEventsPanel(Serie serie) {
        JPanel panel = new JPanel();
        int ownedEvents = (int) serie.getTracks().stream().filter(track ->
                this.trackMap.get(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8)).stream()
                        .filter(item -> item.getId() == track.getId())
                        .findFirst()
                        .get().isOwned()
        ).count();
        JLabel label = new JLabel(String.valueOf(12 - ownedEvents));
        panel.setPreferredSize(new Dimension(EVENT_WIDTH, LINE_HEIGHT));
        panel.add(label);
        if (calculateParticipation(serie)) {
            panel.setBackground(Color.GREEN);
        }
        return panel;
    }


    private boolean calculateParticipation(Serie serie) {
        int ownedEvents = (int) serie.getTracks().stream().filter(track ->
                this.trackMap.get(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8)).stream()
                .filter(item -> item.getId() == track.getId())
                .findFirst()
                .get().isOwned()
        ).count();
        if (ownedEvents == 0) {
            return false;
        }
        return ownedEvents >= 8;
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


    // Getters & Setters
    public void setSeriesList(List<Serie> seriesList) {
        this.seriesList = seriesList;
    }

    public void setCarContentList(List<Content> carContentList) {
        this.carContentList = carContentList;
    }

    public void setTrackMap(Map<String, List<Content>> trackMap) {
        this.trackMap = trackMap;
    }
}
