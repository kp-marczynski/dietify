package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.ProductBasicNutritionDataDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductBasicNutritionData} and its DTO {@link ProductBasicNutritionDataDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface ProductBasicNutritionDataMapper extends EntityMapper<ProductBasicNutritionDataDTO, ProductBasicNutritionData> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.description", target = "productDescription")
    ProductBasicNutritionDataDTO toDto(ProductBasicNutritionData productBasicNutritionData);

    @Mapping(source = "productId", target = "product")
    ProductBasicNutritionData toEntity(ProductBasicNutritionDataDTO productBasicNutritionDataDTO);

    default ProductBasicNutritionData fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductBasicNutritionData productBasicNutritionData = new ProductBasicNutritionData();
        productBasicNutritionData.setId(id);
        return productBasicNutritionData;
    }
}
