package pl.marczynski.dietify.recipes.service.mapper;

import pl.marczynski.dietify.recipes.domain.*;
import pl.marczynski.dietify.recipes.service.dto.RecipeSuitableForDietDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RecipeSuitableForDiet} and its DTO {@link RecipeSuitableForDietDTO}.
 */
@Mapper(componentModel = "spring", uses = {RecipeMapper.class})
public interface RecipeSuitableForDietMapper extends EntityMapper<RecipeSuitableForDietDTO, RecipeSuitableForDiet> {

    @Mapping(source = "recipe.id", target = "recipeId")
    @Mapping(source = "recipe.name", target = "recipeName")
    RecipeSuitableForDietDTO toDto(RecipeSuitableForDiet recipeSuitableForDiet);

    @Mapping(source = "recipeId", target = "recipe")
    RecipeSuitableForDiet toEntity(RecipeSuitableForDietDTO recipeSuitableForDietDTO);

    default RecipeSuitableForDiet fromId(Long id) {
        if (id == null) {
            return null;
        }
        RecipeSuitableForDiet recipeSuitableForDiet = new RecipeSuitableForDiet();
        recipeSuitableForDiet.setId(id);
        return recipeSuitableForDiet;
    }
}
