package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.RecipeBasicNutritionDataDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RecipeBasicNutritionData} and its DTO {@link RecipeBasicNutritionDataDTO}.
 */
@Mapper(componentModel = "spring", uses = {RecipeMapper.class})
public interface RecipeBasicNutritionDataMapper extends EntityMapper<RecipeBasicNutritionDataDTO, RecipeBasicNutritionData> {

    @Mapping(source = "recipe.id", target = "recipeId")
    @Mapping(source = "recipe.name", target = "recipeName")
    RecipeBasicNutritionDataDTO toDto(RecipeBasicNutritionData recipeBasicNutritionData);

    @Mapping(source = "recipeId", target = "recipe")
    RecipeBasicNutritionData toEntity(RecipeBasicNutritionDataDTO recipeBasicNutritionDataDTO);

    default RecipeBasicNutritionData fromId(Long id) {
        if (id == null) {
            return null;
        }
        RecipeBasicNutritionData recipeBasicNutritionData = new RecipeBasicNutritionData();
        recipeBasicNutritionData.setId(id);
        return recipeBasicNutritionData;
    }
}
