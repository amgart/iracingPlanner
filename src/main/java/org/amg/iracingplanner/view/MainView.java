package org.amg.iracingplanner.view;


import java.awt.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.swing.*;
import org.amg.iracingplanner.dao.CarDAO;
import org.amg.iracingplanner.dao.SeriesDAO;
import org.amg.iracingplanner.dao.TrackDAO;
import org.amg.iracingplanner.objet.Content;
import org.amg.iracingplanner.objet.Series;

public class MainView extends JFrame {

    // Constants
    private static final String DASHBOARD_TITLE = "Dashboard";
    private static final String CARS_TITLE = "My Cars";
    private static final String TRACKS_TITLE = "My Tracks";
    private static final String ABOUT_TITLE = "About";
    private static final String OWNED_CARS_FILE = "owned\\ownedCars.txt";
    private static final String OWNED_TRACK_FILE = "owned\\ownedTracks.txt";
    private static final int SCREEN_HEIGHT = 1050;
    private static final int SCREEN_WIDTH = 1920;


    // Constructor
    MainView() {

        // Get all data (filtering for now the championships that does not have 12 weeks)
        // TODO fix visualization issues to make the championships different than 12 weeks look good
        List<Series> seriesList = getSeriesList();
        List<Content> carContentList = getCarsContent();
        Map<String, List<Content>> trackMap = getTracksContent();

        // Window title
        this.setTitle("iRacing Season Planner");

        // Add the upper menu
        JTabbedPane mainPanel = new JTabbedPane();
        DashboardView dashboardView = new DashboardView(seriesList, carContentList, trackMap);
        mainPanel.addTab(DASHBOARD_TITLE, dashboardView);
        mainPanel.addTab(CARS_TITLE, new CarView(carContentList));
        mainPanel.addTab(TRACKS_TITLE, new TrackView(trackMap));
        mainPanel.addTab(ABOUT_TITLE, new AboutView());
        this.add(mainPanel, BorderLayout.CENTER);

        // Adding change listener
        mainPanel.addChangeListener(changeEvent -> {
            JTabbedPane sourceTabbedPane = (JTabbedPane) changeEvent.getSource();
            int index = sourceTabbedPane.getSelectedIndex();
            if (sourceTabbedPane.getTitleAt(index).equals(DASHBOARD_TITLE)) {
                dashboardView.setSeriesList(getSeriesList());
                dashboardView.setCarContentList(getCarsContent());
                dashboardView.setTrackMap(getTracksContent());
                dashboardView.init();
                dashboardView.repaint();
            }
        });

        // Configure the view
        this.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.setVisible(true);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
    }


    // Method to get tracks
    private Map<String, List<Content>> getTracksContent() {
        return new TrackDAO(OWNED_TRACK_FILE).findAll();
    }


    // Method to get cars
    private List<Content> getCarsContent() {
        return new CarDAO(OWNED_CARS_FILE).findAll();
    }


    // Method to get series
    private List<Series> getSeriesList() {
        return new SeriesDAO().findAll().stream()
                .filter(item -> item.getTracks().size() == 12).collect(Collectors.toList());
    }


    // This is the main method for the app
    public static void main(String[] args) {
        new MainView();
    }


}
