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
    private final String ownedContentFile;


    // Constructor
    public ContentDAO(String contentFile, String ownedContentFile) {
        this.contentFile = contentFile;
        this.ownedContentFile = ownedContentFile;
    }

    // Method that gets all from file
    public List<Content> findAll() {
        try {
            ensureFileExists(this.ownedContentFile);
            String content = read(this.contentFile);
            String ownedContent = read(this.ownedContentFile);
            return parse(content, ownedContent);
        } catch (FileNotFoundException e) {
            System.out.println("[iRacingPlanner].[findAll] - Cannot find content");
        }
        return null;
    }


    // Method to find Content by Id
    public Content findById(String id) throws FileNotFoundException {
        String data = read(this.contentFile);
        String[] contentList = data.split("\n");
        for (String content : contentList) {
            String[] attrs = content.split(",");
            if (attrs[0].equals(id)) {
                return convert(content);
            }
        }
        return null;
    }


    // Method that saves the content into file
    public boolean save(Content content) {
        ensureFileExists(this.ownedContentFile);
        try {
            if (!content.isOwned()) {
                return removeContentFromFile(this.ownedContentFile, content);
            } else{
                return addContentToFile(this.ownedContentFile, content);
            }
        } catch (IOException e) {
            System.out.println("[iRacingPlanner].[save] - Cannot save content!");
            return false;
        }
    }


    // Method to remove content from file
    private boolean removeContentFromFile(String file, Content content) throws IOException {
        String data = read(file);
        data = data.replace(toString(content), "");
        System.out.println(data);
        return saveToFile(file, data);
    }


    // Method to add content into file
    private boolean addContentToFile(String file, Content content) throws IOException {
        String data = read(file);
        data += toString(content);
        return saveToFile(file, data);
    }


    // Read file
    private String read(String file) throws FileNotFoundException {
        File contentFile = new File(file);
        BufferedReader reader =  new BufferedReader(new InputStreamReader(new FileInputStream(contentFile)));
        Stream<String> lines = reader.lines();
        String data = lines.collect(Collectors.joining("\n"));
        lines.close();
        return data;
    }


    // Parse data to content object
    private List<Content> parse(String allContent, String ownedContent) {
        List<Content> contentList = new ArrayList<>();
        String[] lines = allContent.split("\n");
        for(String line : lines) {
            Content content = convert(line);
            if (ownedContent.contains(toString(content))) {
                content.setOwned(true);
            }
            contentList.add(content);
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
        return content;
    }


    // Method that builds a string from a Content
    private String toString(Content newContent) {
        return newContent.getId() + ","+ newContent.getName();
    }


    // Method that writes the data into file
    private boolean saveToFile(String file, String data) throws IOException {
        File contentFile = new File(file);
        if (contentFile.exists()) {
            contentFile.delete();
        }
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));
        bufferedWriter.write(data);
        bufferedWriter.close();
        return true;
    }


    // Method to verify if the file exists. If not, create it.
    private void ensureFileExists(String file) {
        File f = new File(file);
        if (!f.exists()) {
            try {
                f.createNewFile();
            } catch (IOException e) {
                System.out.println("[iRacingPlanner].[ensureContentFileExists] - Cannot create file!");
            }
        }
    }

}
