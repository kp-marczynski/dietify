package pl.marczynski.dietify.products.domain;

public class ProductSubcategoryCreator {
    public static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    public static ProductSubcategory createEntity(ProductCategory productCategory) {
        ProductSubcategory productSubcategory = new ProductSubcategory()
            .description(DEFAULT_DESCRIPTION);
        productSubcategory.setCategory(productCategory);
        return productSubcategory;
    }
}
