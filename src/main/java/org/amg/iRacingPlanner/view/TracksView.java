package org.amg.iRacingPlanner.view;

import javax.swing.JLabel;
import javax.swing.JPanel;

public class TracksView extends JPanel{

    // Constructor
    TracksView() {
        JPanel tracksPanel = new JPanel();
        JLabel tracksLabel = new JLabel("My tracks");
        tracksPanel.add(tracksLabel);
        this.add(tracksPanel);
        this.setVisible(true);
    }

}
