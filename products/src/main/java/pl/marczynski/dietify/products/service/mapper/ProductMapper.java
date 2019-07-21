package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductSubcategoryMapper.class, DietTypeMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "subcategory.id", target = "subcategoryId")
    @Mapping(source = "subcategory.description", target = "subcategoryDescription")
    ProductDTO toDto(Product product);

    @Mapping(source = "subcategoryId", target = "subcategory")
    @Mapping(target = "basicNutritionData", ignore = true)
    @Mapping(target = "nutritionData", ignore = true)
    @Mapping(target = "householdMeasures", ignore = true)
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
