package org.amg.iRacingPlanner.dao;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import org.amg.iRacingPlanner.objet.Content;

public class ContentDAO {

    // Constants
    final String ownedContentFile;


    // Constructor
    public ContentDAO(String ownedContentFile) {
        this.ownedContentFile = ownedContentFile;
    }


    // Method to verify if the file exists. If not, create it.
    void ensureFileExists(String file) {
        File f = new File(file);
        if (!f.exists()) {
            try {
                f.createNewFile();
            } catch (IOException e) {
                System.out.println("[iRacingPlanner].[ensureContentFileExists] - Cannot create file!");
            }
        }
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
        data = data.replace(content.toString(), "");
        data = data.replace(System.lineSeparator() + System.lineSeparator(), System.lineSeparator());
        if (data.startsWith(System.lineSeparator())) {
            data = data.replaceFirst(System.lineSeparator(), "");
        }
        return saveToFile(file, data);
    }


    // Method to add content into file
    private boolean addContentToFile(String file, Content content) throws IOException {
        String data = read(file);
        if (data.isEmpty()) {
            data += content.toString();
        } else {
            data += System.lineSeparator() + content.toString();
        }
        return saveToFile(file, data);
    }


    // Read file
    private String read(String file) throws IOException {
        return Files.lines(Paths.get(file)).collect(Collectors.joining(System.lineSeparator()));
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
}
