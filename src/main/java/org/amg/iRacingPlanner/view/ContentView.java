package org.amg.iRacingPlanner.view;

import org.amg.iRacingPlanner.dao.ContentDAO;
import org.amg.iRacingPlanner.objet.Content;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class ContentView extends JPanel {


    // Constructor
    ContentView(String contentFile, String ownedContentFile) {
        ContentDAO contentDAO = new ContentDAO(contentFile, ownedContentFile);
        JPanel contentPanel = new JPanel(new GridLayout(0,3));
        List<Content> contentList = contentDAO.findAll();
        for (Content content : contentList) {
            contentPanel.add(print(content, contentDAO));
        }
        contentPanel.setPreferredSize(new Dimension(1400, 800));
        JScrollPane scrollPane = new JScrollPane(contentPanel,
                ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        this.add(scrollPane);
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
            if (checkbox.isSelected()) {
                content.setOwned(true);
            } else {
                content.setOwned(false);
            }
            contentDAO.save(content);
        });
        return checkbox;
    }

}
