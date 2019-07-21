package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.ProductSubcategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductSubcategory} and its DTO {@link ProductSubcategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductCategoryMapper.class})
public interface ProductSubcategoryMapper extends EntityMapper<ProductSubcategoryDTO, ProductSubcategory> {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.description", target = "categoryDescription")
    ProductSubcategoryDTO toDto(ProductSubcategory productSubcategory);

    @Mapping(source = "categoryId", target = "category")
    ProductSubcategory toEntity(ProductSubcategoryDTO productSubcategoryDTO);

    default ProductSubcategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductSubcategory productSubcategory = new ProductSubcategory();
        productSubcategory.setId(id);
        return productSubcategory;
    }
}
