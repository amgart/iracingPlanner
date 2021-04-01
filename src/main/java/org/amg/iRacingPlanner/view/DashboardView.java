package org.amg.iRacingPlanner.view;

import javax.swing.JLabel;
import javax.swing.JPanel;

public class DashboardView extends JPanel {

    // Constructor
    DashboardView() {JPanel dashboardPanel = new JPanel();
        JLabel dashboardLabel = new JLabel("My dashboard");
        dashboardPanel.add(dashboardLabel);
        this.add(dashboardPanel);
        this.setVisible(true);

    }
}
