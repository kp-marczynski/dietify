package pl.marczynski.dietify.core.utils;

public interface Validator<T> {

    ValidationResult validate(T toValidate);
}
