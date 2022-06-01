package org.amg.iracingplanner.dao;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.amg.iracingplanner.objet.Content;
import org.amg.iracingplanner.objet.Track;

public class TrackDAO extends ContentDAO {


    // Constructor
    public TrackDAO(String ownedContentFile) {
        super(ownedContentFile);
    }


    // Method that gets all cars
    public Map<String, List<Content>> findAll() {
        try {
            ensureFileExists(this.ownedContentFile);
            Map<String, List<Track>> trackMap = new SerieDAO().findAll().stream()
                    .flatMap(item -> item.getTracks().stream())
                    .distinct()
                    .peek(track -> track.setName(java.net.URLDecoder.decode(track.getName(), StandardCharsets.UTF_8)))
                    .sorted(Comparator.comparing(Track::getName))
                    .collect(Collectors.groupingBy(Track::getName));
            List<Track> ownedTrackList = read(this.ownedContentFile);
            return parse(trackMap, ownedTrackList);
        } catch (IOException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot find content");
        }
        return new HashMap<>();
    }


    // Parse data to content object
    private Map<String, List<Content>> parse(Map<String, List<Track>> allContent, List<Track> ownedContent) {
        Map<String, List<Content>> contentMap = new HashMap<>();
        allContent.keySet().forEach(trackName -> allContent.get(trackName).forEach(item -> {
            Content content = convertToContent(item);
            if (ownedContent.stream().anyMatch(owned -> owned.getName().equals(item.getName()))) {
                content.setOwned(true);
            }
            if (contentMap.get(trackName) != null) {
                contentMap.get(trackName).add(content);
            } else {
                List<Content> newList = new ArrayList<>();
                newList.add(content);
                contentMap.put(trackName, newList);
            }
        }));
        return contentMap;
    }


    // Convert car to content
    private Content convertToContent(Track track) {
        return new Content(track.getId(), track.getName(), false, false);
    }


    // Read file
    private List<Track> read(String file) throws IOException {
        Path path = Paths.get(file);
        Stream<String> lines = Files.lines(path, StandardCharsets.ISO_8859_1);
        Stream<Track> tracks = lines.map(this::convertToTrack);
        return tracks.toList();
    }


    // Method that converts a line in the file to a car object
    private Track convertToTrack(String line) {
        String[] fields = line.split(",");
        return new Track(fields[1], Integer.parseInt(fields[0]), 0, null);
    }

}
