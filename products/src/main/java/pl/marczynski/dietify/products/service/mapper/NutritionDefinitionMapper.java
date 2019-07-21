package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.NutritionDefinitionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NutritionDefinition} and its DTO {@link NutritionDefinitionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NutritionDefinitionMapper extends EntityMapper<NutritionDefinitionDTO, NutritionDefinition> {


    @Mapping(target = "translations", ignore = true)
    NutritionDefinition toEntity(NutritionDefinitionDTO nutritionDefinitionDTO);

    default NutritionDefinition fromId(Long id) {
        if (id == null) {
            return null;
        }
        NutritionDefinition nutritionDefinition = new NutritionDefinition();
        nutritionDefinition.setId(id);
        return nutritionDefinition;
    }
}
