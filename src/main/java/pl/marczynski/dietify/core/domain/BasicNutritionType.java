package pl.marczynski.dietify.core.domain;

public enum BasicNutritionType {
    ENERGY("ENERC_KCAL"), CARBOHYDRATES("CHOCDF"), FAT("FAT"), PROTEIN("PROCNT");

    private String tagname;

    BasicNutritionType(String tagname) {
        this.tagname = tagname;
    }

    public String getTagname() {
        return tagname;
    }

    public void setTagname(String tagname) {
        this.tagname = tagname;
    }
}
