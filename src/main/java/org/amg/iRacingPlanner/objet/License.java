package org.amg.iRacingPlanner.objet;

public enum License {

    R(1),
    D(4),
    C(8),
    B(12),
    A(16);

    private final int value;

    License(int i) {
        this.value = i;
    }

    public static String valueOf(int value) {
        for (License category : values()) {
            if (category.value == value) {
                return category.name();
            }
        }
        return null;
    }
}
