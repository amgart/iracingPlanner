package org.amg.iRacingPlanner.objet;

public enum Category {

    OVAL(1),
    ROAD(2),
    DIRT_OVAL(3),
    DIRT_ROAD(4);

    private final int value;

    Category(int i) {
        this.value = i;
    }

    public static String valueOf(int value) {
        for (Category category : values()) {
            if (category.value == value) {
                return category.name();
            }
        }
        return null;
    }
}
