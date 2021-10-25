package org.amg.iRacingPlanner.view;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import javax.swing.*;
import org.amg.iRacingPlanner.dao.TrackDAO;
import org.amg.iRacingPlanner.objet.Content;

public class AboutView extends JPanel {


    // Constructor (tracks)
    AboutView() {
        JPanel contentPanel = new JPanel();

        // Intro panel
        JPanel innerPanel = new JPanel();
        innerPanel.setLayout(new BoxLayout(innerPanel, BoxLayout.PAGE_AXIS));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("About me:"));
        innerPanel.add(new JLabel("My name is Albert and I am an enthusiast of simracing."));
        innerPanel.add(new JLabel("Some years ago I started with this hobby, registered into iRacing and " +
                "after some seasons I decided to create this simple tool to help simracers planning their season."));


        // About this tool
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("Instructions:"));
        innerPanel.add(new JLabel("Just select your owned cars and tracks in the corresponding tabs and you will " +
                "see your season in the dashboard tab."));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("Some notes:"));
        innerPanel.add(new JLabel("At this moment, this tool uses a json produced with a call in the API of iRacing and for now this " +
                "needs to be updated manually every season. Please go to my Github repository to download latest updates. " +
                "I will be updating it until I found an automatic solution for this."));
        innerPanel.add(new JLabel("The list of cars and tracks are automatically generated with the mentioned json. It is possible " +
                "that if a car or a track is not used and does not appear in the json, you won't find it in the list."));
        innerPanel.add(new JLabel("If the json contains duplicated cars or tracks with different names, they will appear duplicated " +
                "too in the corresponding list. Please select all that apply if this happens."));

        // Future steps
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("Future steps:"));
        innerPanel.add(new JLabel("I know that this tool needs a lot of new features, fixes and improvements, but please, understand" +
                "that I do not have a lot of time."));
        innerPanel.add(new JLabel("You can provide me some feedback or recoment new features in my Github repository or " +
                "leave me a comment somewhere in the social media."));
        innerPanel.add(new JLabel( "New features planned includes: series filtering, adding favorites series, cars and tracks, a price" +
                "calculator (if you want to plan what to buy), and for sure visual enhancements."));


        // Social media links and final info
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("Useful info and links:"));
        innerPanel.add(new JLabel("Finally, I want to leave here some links where you can contact me if you need it, follow me " +
                "in the social media if you want to, or donate with Paypal (all options would be very helpful to keep improving this tool."));
        innerPanel.add(new JLabel(" "));

        // Github
        JLabel github = new JLabel("My Github repository");
        github.setForeground(Color.BLUE.darker());
        github.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        github.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://github.com/amgart/iracingPlanner"));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing Github");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing Github");
                }
            }
        });
        innerPanel.add(github);

        // YouTube
        JLabel youtube = new JLabel("My YouTube channel");
        youtube.setForeground(Color.BLUE.darker());
        youtube.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        youtube.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://www.youtube.com/channel/UC5TSGSOsf1KE2zjnFFJTSfw"));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing YouTube");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing YouTube");
                }
            }
        });
        innerPanel.add(youtube);

        // Twitch
        JLabel twitch = new JLabel("My Twitch channel");
        twitch.setForeground(Color.BLUE.darker());
        twitch.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        twitch.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://www.twitch.tv/amgart88"));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing Twitch");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing Twitch");
                }
            }
        });
        innerPanel.add(twitch);

        // Instagram
        JLabel instagram = new JLabel("My Instagram");
        instagram.setForeground(Color.BLUE.darker());
        instagram.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        instagram.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://www.instagram.com/amg.art/"));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing Instagram");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing Instagram");
                }
            }
        });
        innerPanel.add(instagram);

        // iRacing refid
        JLabel iracing = new JLabel("If you want to register into iRacing, click here");
        iracing.setForeground(Color.BLUE.darker());
        iracing.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        iracing.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://www.iracing.com/membership/?refid=366160"));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing iRacing");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing iRacing");
                }
            }
        });
        innerPanel.add(iracing);

        // Paypal
        JLabel paypal = new JLabel("If you want to make a donation, click here");
        paypal.setForeground(Color.BLUE.darker());
        paypal.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        paypal.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WBC5FZRDZHMSE"));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing paypal");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing paypal");
                }
            }
        });
        innerPanel.add(paypal);

        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("Thank you so much!! :)"));

        contentPanel.add(innerPanel);
        contentPanel.setPreferredSize(new Dimension(1920, 1080));
        this.add(contentPanel);
        this.setVisible(true);
    }

}
