package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.RecipeUnsuitableForDietDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RecipeUnsuitableForDiet} and its DTO {@link RecipeUnsuitableForDietDTO}.
 */
@Mapper(componentModel = "spring", uses = {RecipeMapper.class})
public interface RecipeUnsuitableForDietMapper extends EntityMapper<RecipeUnsuitableForDietDTO, RecipeUnsuitableForDiet> {

    @Mapping(source = "recipe.id", target = "recipeId")
    @Mapping(source = "recipe.name", target = "recipeName")
    RecipeUnsuitableForDietDTO toDto(RecipeUnsuitableForDiet recipeUnsuitableForDiet);

    @Mapping(source = "recipeId", target = "recipe")
    RecipeUnsuitableForDiet toEntity(RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO);

    default RecipeUnsuitableForDiet fromId(Long id) {
        if (id == null) {
            return null;
        }
        RecipeUnsuitableForDiet recipeUnsuitableForDiet = new RecipeUnsuitableForDiet();
        recipeUnsuitableForDiet.setId(id);
        return recipeUnsuitableForDiet;
    }
}
