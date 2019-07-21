package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealRecipeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealRecipe} and its DTO {@link MealRecipeDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealMapper.class})
public interface MealRecipeMapper extends EntityMapper<MealRecipeDTO, MealRecipe> {

    @Mapping(source = "meal.id", target = "mealId")
    MealRecipeDTO toDto(MealRecipe mealRecipe);

    @Mapping(source = "mealId", target = "meal")
    MealRecipe toEntity(MealRecipeDTO mealRecipeDTO);

    default MealRecipe fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealRecipe mealRecipe = new MealRecipe();
        mealRecipe.setId(id);
        return mealRecipe;
    }
}
