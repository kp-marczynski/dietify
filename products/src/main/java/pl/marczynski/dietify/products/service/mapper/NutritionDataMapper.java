package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.NutritionDataDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NutritionData} and its DTO {@link NutritionDataDTO}.
 */
@Mapper(componentModel = "spring", uses = {NutritionDefinitionMapper.class, ProductMapper.class})
public interface NutritionDataMapper extends EntityMapper<NutritionDataDTO, NutritionData> {

    @Mapping(source = "nutritionDefinition.id", target = "nutritionDefinitionId")
    @Mapping(source = "nutritionDefinition.tag", target = "nutritionDefinitionTag")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.description", target = "productDescription")
    NutritionDataDTO toDto(NutritionData nutritionData);

    @Mapping(source = "nutritionDefinitionId", target = "nutritionDefinition")
    @Mapping(source = "productId", target = "product")
    NutritionData toEntity(NutritionDataDTO nutritionDataDTO);

    default NutritionData fromId(Long id) {
        if (id == null) {
            return null;
        }
        NutritionData nutritionData = new NutritionData();
        nutritionData.setId(id);
        return nutritionData;
    }
}
