package org.amg.iRacingPlanner.view;

import java.awt.*;
import java.util.List;
import javax.swing.*;
import org.amg.iRacingPlanner.dao.CarDAO;
import org.amg.iRacingPlanner.dao.ContentDAO;
import org.amg.iRacingPlanner.objet.Content;

public class CarView extends JPanel {

    // Constants
    private static final String OWNED_CARS_FILE = "build\\libs\\owned\\ownedCars.txt";


    // Constructor (cars)
    CarView(List<Content> contentList) {
        JPanel contentPanel = new JPanel(new GridLayout(contentList.size()/5,5));
        contentList.forEach(content -> contentPanel.add(print(content, new CarDAO(OWNED_CARS_FILE))));
        contentPanel.setPreferredSize(new Dimension(1920, 1080));
        this.add(contentPanel);
        this.setVisible(true);
    }


    // Create the JPanel for each content
    private JPanel print(Content content, ContentDAO contentDAO) {
        JPanel contentPanel = new JPanel();
        JLabel contentLabel = getContentLabel(content);
        contentPanel.add(createCheckBoxFor(content, contentDAO));
        contentPanel.add(contentLabel);
        return contentPanel;
    }


    // Build the content label depending on the attributes
    private JLabel getContentLabel(Content content) {
        JLabel label = new JLabel(content.getName());
        if (content.isDefaultContent()) {
            label.setForeground(Color.GRAY);
        } else if (content.isOwned()) {
            label.setForeground(Color.GREEN);
        }
        return label;
    }


    // Create checkbox
    private JCheckBox createCheckBoxFor(Content content, ContentDAO contentDAO) {
        JCheckBox checkbox = new JCheckBox();
        if (content.isDefaultContent()) {
            checkbox.setSelected(true);
            checkbox.setEnabled(false);
        } else if (content.isOwned()) {
            checkbox.setSelected(true);
        }
        checkbox.addActionListener(e -> {
            content.setOwned(checkbox.isSelected());
            contentDAO.save(content);
        });
        return checkbox;
    }

}
