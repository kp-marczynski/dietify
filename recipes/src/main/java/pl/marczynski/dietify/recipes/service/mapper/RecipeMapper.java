package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.RecipeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Recipe} and its DTO {@link RecipeDTO}.
 */
@Mapper(componentModel = "spring", uses = {KitchenApplianceMapper.class, DishTypeMapper.class, MealTypeMapper.class})
public interface RecipeMapper extends EntityMapper<RecipeDTO, Recipe> {

    @Mapping(source = "sourceRecipe.id", target = "sourceRecipeId")
    @Mapping(source = "sourceRecipe.name", target = "sourceRecipeName")
    RecipeDTO toDto(Recipe recipe);

    @Mapping(source = "sourceRecipeId", target = "sourceRecipe")
    @Mapping(target = "basicNutritionData", ignore = true)
    @Mapping(target = "recipeSections", ignore = true)
    @Mapping(target = "suitableForDiets", ignore = true)
    @Mapping(target = "unsuitableForDiets", ignore = true)
    Recipe toEntity(RecipeDTO recipeDTO);

    default Recipe fromId(Long id) {
        if (id == null) {
            return null;
        }
        Recipe recipe = new Recipe();
        recipe.setId(id);
        return recipe;
    }
}
