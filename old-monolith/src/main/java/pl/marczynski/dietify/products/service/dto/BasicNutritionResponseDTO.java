package pl.marczynski.dietify.products.service.dto;

public class BasicNutritionResponseDTO {
    private Double weight;
    private Double energy;
    private Double carbohydrates;
    private Double fat;
    private Double protein;

    public BasicNutritionResponseDTO() {
        this.weight = 0.0;
        this.energy = 0.0;
        this.carbohydrates = 0.0;
        this.fat = 0.0;
        this.protein = 0.0;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getEnergy() {
        return energy;
    }

    public void setEnergy(Double energy) {
        this.energy = energy;
    }

    public Double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public void addEnergy(Double energy) {
        this.energy += energy;
    }

    public void addCarbohydrates(Double carbohydrates) {
        this.carbohydrates += carbohydrates;
    }

    public void addProtein(Double protein) {
        this.protein += protein;
    }

    public void addFat(Double fat) {
        this.fat += fat;
    }

    public void addWeight(Double weight) {
        this.weight += weight;
    }
}
