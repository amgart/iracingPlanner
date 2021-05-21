package org.amg.iRacingPlanner.view;

import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JTabbedPane;
import java.awt.BorderLayout;

public class MainView extends JFrame {

    // Constants
    private static final int HEIGHT = 1080;
    private static final int WIDTH = 1920;
    private static final String CONTENT_CARS_FILE = "content/cars.txt";
    private static final String OWNED_CARS_FILE = "owned/ownedCars.txt";
    private static final String CONTENT_TRACK_FILE = "content/tracks.txt";
    private static final String OWNED_TRACK_FILE = "owned/ownedTracks.txt";


    // Constructor
    MainView() {

        // Window title
        this.setTitle("iRacing Season Planner");

        // Add the upper menu
        JTabbedPane mainPanel = new JTabbedPane();

        JComponent dashBoardPanel = new DashboardView(CONTENT_CARS_FILE, OWNED_CARS_FILE, CONTENT_TRACK_FILE, OWNED_TRACK_FILE);
        mainPanel.addTab("Dashboard", dashBoardPanel);

        JComponent carsPanel = new ContentView(CONTENT_CARS_FILE, OWNED_CARS_FILE);
        mainPanel.addTab("My Cars", carsPanel);

        JComponent tracksPanel = new ContentView(CONTENT_TRACK_FILE, OWNED_TRACK_FILE);
        mainPanel.addTab("My Tracks", tracksPanel);

        this.add(mainPanel, BorderLayout.CENTER);

        // Configure the view
        this.setSize(WIDTH, HEIGHT);
        this.setVisible(true);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
    }


    // This is the main method for the app
    public static void main(String[] args) {
        new MainView();
    }


}
