package org.amg.iRacingPlanner.view;


import java.awt.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.swing.*;
import org.amg.iRacingPlanner.dao.CarDAO;
import org.amg.iRacingPlanner.dao.SerieDAO;
import org.amg.iRacingPlanner.dao.TrackDAO;
import org.amg.iRacingPlanner.objet.Content;
import org.amg.iRacingPlanner.objet.Serie;

public class MainView extends JFrame {

    // Constants
    private static final String OWNED_CARS_FILE = "build\\libs\\owned\\ownedCars.txt";
    private static final String OWNED_TRACK_FILE = "build\\libs\\owned\\ownedTracks.txt";
    private static final int SCREEN_HEIGHT = 1000;
    private static final int SCREEN_WIDTH = 1920;


    // Constructor
    MainView() {

        // Get all data (filtering for now the championships that does not have 12 weeks)
        // TODO fix visualization issues to make the championships different than 12 weeks look good
        java.util.List<Serie> seriesList =  new SerieDAO().findAll().stream()
                .filter(item -> item.getTracks().size() == 12).toList();
        java.util.List<Content> carContentList = new CarDAO(OWNED_CARS_FILE).findAll();
        Map<String, List<Content>> trackMap = new TrackDAO(OWNED_TRACK_FILE).findAll();

        // Window title
        this.setTitle("iRacing Season Planner");

        // Add the upper menu
        JTabbedPane mainPanel = new JTabbedPane();

        JComponent dashBoardPanel = new DashboardView(seriesList, carContentList, trackMap);
        mainPanel.addTab("Dashboard", dashBoardPanel);

        JComponent carsPanel = new CarView(carContentList);
        mainPanel.addTab("My Cars", carsPanel);

        JComponent tracksPanel = new TrackView(trackMap);
        mainPanel.addTab("My Tracks", tracksPanel);

        this.add(mainPanel, BorderLayout.CENTER);

        // Configure the view
        this.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.setVisible(true);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
    }


    // This is the main method for the app
    public static void main(String[] args) {
        new MainView();
    }


}
