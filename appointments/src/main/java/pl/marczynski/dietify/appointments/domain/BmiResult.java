package pl.marczynski.dietify.appointments.domain;

import java.time.Instant;

public class BmiResult {
    private Instant date;
    private Double bmi;

    public BmiResult() {
    }

    public BmiResult(Instant date, Double bmi) {
        this.date = date;
        this.bmi = bmi;
    }

    public BmiResult(Instant date, int weight, int height) {
        this.date = date;
        double heightInMeters = ((double) height) / 100;
        this.bmi = weight / Math.pow(heightInMeters, 2);
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    @Override
    public String toString() {
        return "BmiResult{" +
            "date=" + date +
            ", bmi=" + bmi +
            '}';
    }
}
