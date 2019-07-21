package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.NutritionDefinitionTranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NutritionDefinitionTranslation} and its DTO {@link NutritionDefinitionTranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {NutritionDefinitionMapper.class})
public interface NutritionDefinitionTranslationMapper extends EntityMapper<NutritionDefinitionTranslationDTO, NutritionDefinitionTranslation> {

    @Mapping(source = "nutritionDefinitions.id", target = "nutritionDefinitionsId")
    @Mapping(source = "nutritionDefinitions.tag", target = "nutritionDefinitionsTag")
    NutritionDefinitionTranslationDTO toDto(NutritionDefinitionTranslation nutritionDefinitionTranslation);

    @Mapping(source = "nutritionDefinitionsId", target = "nutritionDefinitions")
    NutritionDefinitionTranslation toEntity(NutritionDefinitionTranslationDTO nutritionDefinitionTranslationDTO);

    default NutritionDefinitionTranslation fromId(Long id) {
        if (id == null) {
            return null;
        }
        NutritionDefinitionTranslation nutritionDefinitionTranslation = new NutritionDefinitionTranslation();
        nutritionDefinitionTranslation.setId(id);
        return nutritionDefinitionTranslation;
    }
}
