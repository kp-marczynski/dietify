package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.PreparationStepDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PreparationStep} and its DTO {@link PreparationStepDTO}.
 */
@Mapper(componentModel = "spring", uses = {RecipeSectionMapper.class})
public interface PreparationStepMapper extends EntityMapper<PreparationStepDTO, PreparationStep> {

    @Mapping(source = "recipeSection.id", target = "recipeSectionId")
    @Mapping(source = "recipeSection.sectionName", target = "recipeSectionSectionName")
    PreparationStepDTO toDto(PreparationStep preparationStep);

    @Mapping(source = "recipeSectionId", target = "recipeSection")
    PreparationStep toEntity(PreparationStepDTO preparationStepDTO);

    default PreparationStep fromId(Long id) {
        if (id == null) {
            return null;
        }
        PreparationStep preparationStep = new PreparationStep();
        preparationStep.setId(id);
        return preparationStep;
    }
}
