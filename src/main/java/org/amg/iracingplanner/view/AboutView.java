package org.amg.iracingplanner.view;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.Desktop;
import java.awt.Dimension;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import javax.swing.BoxLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class AboutView extends JPanel {

    private static final String PAYPAL_TEXT = "If you want to make a donation, click here";
    private static final String PAYPAL_URL = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WBC5FZRDZHMSE";
    private static final String REFID_TEXT = "If you want to register into iRacing, click here";
    private static final String REFID_URL = "https://www.iracing.com/membership/?refid=366160";
    private static final String INSTAGRAM_TEXT = "My Instagram";
    private static final String INSTAGRAM_URL = "https://www.instagram.com/amg.art/";
    private static final String TWITCH_TEXT = "My Twitch channel";
    private static final String TWITCH_URL = "https://www.twitch.tv/amgart88";
    private static final String YOUTUBE_TEXT = "My YouTube channel";
    private static final String YOUTUBE_URL = "https://www.youtube.com/channel/UC5TSGSOsf1KE2zjnFFJTSfw";
    private static final String GITHUB_TEXT = "My Github repository";
    private static final String GITHUB_URL = "https://github.com/amgart/iracingPlanner";


    // Constructor
    AboutView() {
        JPanel contentPanel = new JPanel();
        contentPanel.add(buildInnerPanel());
        contentPanel.setPreferredSize(new Dimension(1920, 1080));
        this.add(contentPanel);
        this.setVisible(true);
    }

    /**
     * Build inner panel for the view.
     * @return panel
     */
    private JPanel buildInnerPanel() {
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
        innerPanel.add(buildLinkLabel(GITHUB_TEXT, GITHUB_URL));

        // YouTube
        innerPanel.add(buildLinkLabel(YOUTUBE_TEXT, YOUTUBE_URL));

        // Twitch
        innerPanel.add(buildLinkLabel(TWITCH_TEXT,  TWITCH_URL));

        // Instagram
        innerPanel.add(buildLinkLabel(INSTAGRAM_TEXT, INSTAGRAM_URL));

        // iRacing refid
        innerPanel.add(buildLinkLabel(REFID_TEXT, REFID_URL));

        // Paypal
        innerPanel.add(buildLinkLabel(PAYPAL_TEXT, PAYPAL_URL));

        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel(" "));
        innerPanel.add(new JLabel("Thank you so much!! :)"));

        return innerPanel;
    }

    /**
     * Build link label with the given @text and @url
     * @param text text shown.
     * @param url url
     * @return build label
     */
    private JLabel buildLinkLabel(String text, String url) {
        JLabel paypal = new JLabel(text);
        paypal.setForeground(Color.BLUE.darker());
        paypal.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        paypal.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI(url));
                } catch (IOException ex) {
                    System.out.println("IOException while accessing link");
                } catch (URISyntaxException ex) {
                    System.out.println("URISyntaxException while accessing link");
                }
            }
        });
        return paypal;
    }

}
