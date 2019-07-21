package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.ProductCategoryTranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductCategoryTranslation} and its DTO {@link ProductCategoryTranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductCategoryMapper.class})
public interface ProductCategoryTranslationMapper extends EntityMapper<ProductCategoryTranslationDTO, ProductCategoryTranslation> {

    @Mapping(source = "productCategory.id", target = "productCategoryId")
    @Mapping(source = "productCategory.description", target = "productCategoryDescription")
    ProductCategoryTranslationDTO toDto(ProductCategoryTranslation productCategoryTranslation);

    @Mapping(source = "productCategoryId", target = "productCategory")
    ProductCategoryTranslation toEntity(ProductCategoryTranslationDTO productCategoryTranslationDTO);

    default ProductCategoryTranslation fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductCategoryTranslation productCategoryTranslation = new ProductCategoryTranslation();
        productCategoryTranslation.setId(id);
        return productCategoryTranslation;
    }
}
