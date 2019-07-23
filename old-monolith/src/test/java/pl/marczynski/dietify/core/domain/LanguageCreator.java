package pl.marczynski.dietify.core.domain;

public class LanguageCreator {

    public static final String DEFAULT_ENGLISH_NAME = "AAAAAAAAAA";
    public static final String UPDATED_ENGLISH_NAME = "BBBBBBBBBB";

    public static Language createEntity() {
        return new Language()
            .englishName(DEFAULT_ENGLISH_NAME);
    }
}
