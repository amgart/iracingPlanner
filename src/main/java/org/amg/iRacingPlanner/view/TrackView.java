package org.amg.iRacingPlanner.view;

import java.awt.*;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import javax.swing.*;
import org.amg.iRacingPlanner.dao.ContentDAO;
import org.amg.iRacingPlanner.dao.TrackDAO;
import org.amg.iRacingPlanner.objet.Content;

public class TrackView extends JPanel {

    // Constants
    private static final String OWNED_TRACK_FILE = "build\\libs\\owned\\ownedTracks.txt";


    // Constructor (tracks)
    TrackView(Map<String, List<Content>> trackMap) {
        JPanel contentPanel = new JPanel(new GridLayout(trackMap.keySet().size()/5,5));
        trackMap.keySet().stream()
                .sorted(Comparator.naturalOrder())
                .forEach(trackName -> contentPanel.add(print(trackMap.get(trackName),
                new TrackDAO(OWNED_TRACK_FILE))));
        contentPanel.setPreferredSize(new Dimension(1920, 1080));
        this.add(contentPanel);
        this.setVisible(true);
    }


    // Create the JPanel for each content
    private JPanel print(List<Content> relatedContent, ContentDAO contentDAO) {
        JPanel contentPanel = new JPanel();
        JLabel contentLabel = getContentLabel(relatedContent.get(0));
        contentPanel.add(createCheckBoxFor(relatedContent.get(0), contentDAO));
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
