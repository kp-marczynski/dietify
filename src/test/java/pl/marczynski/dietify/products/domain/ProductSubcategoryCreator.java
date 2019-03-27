package pl.marczynski.dietify.products.domain;

import javax.persistence.EntityManager;

public class ProductSubcategoryCreator {
    public static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    public static ProductSubcategory createEntity(EntityManager em) {
        ProductCategory productCategory = ProductCategoryCreator.createEntity();
        em.persist(productCategory);
        em.flush();
        return createEntity(productCategory);
    }

    public static ProductSubcategory createEntity(ProductCategory productCategory) {
        ProductSubcategory productSubcategory = new ProductSubcategory()
            .description(DEFAULT_DESCRIPTION);
        productSubcategory.setCategory(productCategory);
        return productSubcategory;
    }
}
