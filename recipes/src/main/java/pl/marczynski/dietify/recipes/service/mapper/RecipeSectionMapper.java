package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.RecipeSectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RecipeSection} and its DTO {@link RecipeSectionDTO}.
 */
@Mapper(componentModel = "spring", uses = {RecipeMapper.class})
public interface RecipeSectionMapper extends EntityMapper<RecipeSectionDTO, RecipeSection> {

    @Mapping(source = "recipe.id", target = "recipeId")
    @Mapping(source = "recipe.name", target = "recipeName")
    RecipeSectionDTO toDto(RecipeSection recipeSection);

    @Mapping(source = "recipeId", target = "recipe")
    @Mapping(target = "productPortions", ignore = true)
    @Mapping(target = "preparationSteps", ignore = true)
    RecipeSection toEntity(RecipeSectionDTO recipeSectionDTO);

    default RecipeSection fromId(Long id) {
        if (id == null) {
            return null;
        }
        RecipeSection recipeSection = new RecipeSection();
        recipeSection.setId(id);
        return recipeSection;
    }
}
