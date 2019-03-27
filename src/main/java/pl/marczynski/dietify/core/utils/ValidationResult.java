package pl.marczynski.dietify.core.utils;

import java.util.LinkedList;
import java.util.List;

public class ValidationResult {
    private List<String> validationProblems;

    public ValidationResult() {
        this.validationProblems = new LinkedList<>();
    }

    public ValidationResult validate(boolean validation, String errorMessage) {
        if (!validation) {
            validationProblems.add(errorMessage);
        }
        return this;
    }

    public ValidationResult addValidationResult(ValidationResult validationResult) {
        this.validationProblems.addAll(validationResult.validationProblems);
        return this;
    }

    public boolean hasValidationPassed() {
        return validationProblems.size() == 0;
    }

    public String getValidationProblem() {
        StringBuilder builder = new StringBuilder();
        for (String validationProblem : validationProblems) {
            builder.append(validationProblem).append("; ");
        }
        return builder.toString();
    }
}
