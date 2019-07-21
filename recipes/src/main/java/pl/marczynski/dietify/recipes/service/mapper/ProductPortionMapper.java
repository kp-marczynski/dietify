package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.ProductPortionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductPortion} and its DTO {@link ProductPortionDTO}.
 */
@Mapper(componentModel = "spring", uses = {RecipeSectionMapper.class})
public interface ProductPortionMapper extends EntityMapper<ProductPortionDTO, ProductPortion> {

    @Mapping(source = "recipeSection.id", target = "recipeSectionId")
    @Mapping(source = "recipeSection.sectionName", target = "recipeSectionSectionName")
    ProductPortionDTO toDto(ProductPortion productPortion);

    @Mapping(source = "recipeSectionId", target = "recipeSection")
    ProductPortion toEntity(ProductPortionDTO productPortionDTO);

    default ProductPortion fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductPortion productPortion = new ProductPortion();
        productPortion.setId(id);
        return productPortion;
    }
}
