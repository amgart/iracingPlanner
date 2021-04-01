package org.amg.iRacingPlanner.dao;

import org.amg.iRacingPlanner.objet.Content;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ContentDAO {

    // Constants
    private final String contentFile;


    // Constructor
    public ContentDAO(String file) {
        this.contentFile = file;
    }

    // Method that gets all from file
    public List<Content> findAll() {
        try {
            String data = read();
            return parse(data);
        } catch (FileNotFoundException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot find content");
        }
        return null;
    }


    // Method that saves the content into file
    public boolean save(Content content) {
        try {
            String data = read();
            return replaceContentInFile(content, data);
        } catch (FileNotFoundException e) {
            System.out.println("[iRacingPlanner].[save] - Cannot save content");
        }
        return false;
    }


    // Read file
    private String read() throws FileNotFoundException {
        File contentFile = new File(this.contentFile);
        BufferedReader reader =  new BufferedReader(new InputStreamReader(new FileInputStream(contentFile)));
        Stream<String> lines = reader.lines();
        String data = lines.collect(Collectors.joining("\n"));
        lines.close();
        return data;
    }


    // Parse data to content object
    private List<Content> parse(String data) {
        List<Content> contentList = new ArrayList<>();
        String[] lines = data.split("\n");
        for(String line : lines) {
            contentList.add(convert(line));
        }
        return contentList;
    }


    // Convert the line to Content object
    private Content convert(String line) {
        String[] columns = line.split(",");
        Content content = new Content();
        content.setId(columns[0]);
        content.setName(columns[1]);
        if ("1".equals(columns[2])) {
            content.setDefaultContent(true);
        }
        if ("1".equals(columns[3])) {
            content.setOwned(true);
        }
        return content;
    }


    // Method to replace the old content with the new content in file
    private boolean replaceContentInFile(Content newContent, String data) {
        try {
            String oldContent = findContent(newContent, data);
            String newContentString = buildNewContentString(newContent);
            String newData = data.replace(oldContent, newContentString);
            return saveToFile(newData);
        } catch (IOException e) {
            System.out.println("[iRacingPlanner].[replaceContentInFile] - Cannot open file");
        }
        return false;
    }


    // Method to find a content in the file and returns the string line
    private String findContent(Content content, String data) {
        String[] lines = data.split("\n");
        for(String line : lines) {
            if (convert(line).getId().equals(content.getId())) {
                return line;
            }
        }
        return "";
    }


    // Method that builds the string to save for the given content
    private String buildNewContentString(Content newContent) {
        String line = newContent.getId() + ","+ newContent.getName() + ",";
        if (newContent.isDefaultContent()) {
            line += "1,";
        } else {
            line += "0,";
        }
        if (newContent.isOwned()) {
            line += "1";
        } else {
            line += "0";
        }
        return line;
    }


    // Method that writes the data into file
    private boolean saveToFile(String data) throws IOException {
        File contentFile = new File(this.contentFile);
        if (contentFile.exists()) {
            contentFile.delete();
        }
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(this.contentFile));
        bufferedWriter.write(data);
        bufferedWriter.close();
        System.out.println("[iRacingPlanner].[saveToFile] - Content properly saved!");
        return true;
    }
}
