package org.amg.iRacingPlanner.view;

import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JTabbedPane;
import java.awt.BorderLayout;

public class MainView extends JFrame {

    // Constants
    private static final int HEIGHT = 900;
    private static final int WIDTH = 1400;


    // Constructor
    MainView() {

        // Window title
        this.setTitle("iRacing Season Planner");



        // Add the upper menu
        JTabbedPane mainPanel = new JTabbedPane();

        JComponent dashBoardPanel = new DashboardView();
        mainPanel.addTab("Dashboard", dashBoardPanel);

        JComponent carsPanel = new ContentView("content/cars.txt", "owned/ownedCars.txt");
        mainPanel.addTab("My Cars", carsPanel);

        JComponent tracksPanel = new ContentView("content/tracks.txt", "owned/ownedTracks.txt");
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
