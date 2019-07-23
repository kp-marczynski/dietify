package pl.marczynski.dietify.products.domain;

public class ProductCategoryCreator {
    public static final String DEFAULT_DESCRIPTION_POLISH = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION_POLISH = "BBBBBBBBBB";

    public static final String DEFAULT_DESCRIPTION_ENGLISH = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION_ENGLISH = "BBBBBBBBBB";

    public static ProductCategory createEntity() {
        ProductCategory productCategory = new ProductCategory()
            .descriptionPolish(DEFAULT_DESCRIPTION_POLISH)
            .descriptionEnglish(DEFAULT_DESCRIPTION_ENGLISH);
        return productCategory;
    }
}
