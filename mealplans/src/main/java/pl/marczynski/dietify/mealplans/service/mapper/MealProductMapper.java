package pl.marczynski.dietify.mealplans.service.mapper;

import pl.marczynski.dietify.mealplans.domain.*;
import pl.marczynski.dietify.mealplans.service.dto.MealProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MealProduct} and its DTO {@link MealProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {MealMapper.class})
public interface MealProductMapper extends EntityMapper<MealProductDTO, MealProduct> {

    @Mapping(source = "meal.id", target = "mealId")
    MealProductDTO toDto(MealProduct mealProduct);

    @Mapping(source = "mealId", target = "meal")
    MealProduct toEntity(MealProductDTO mealProductDTO);

    default MealProduct fromId(Long id) {
        if (id == null) {
            return null;
        }
        MealProduct mealProduct = new MealProduct();
        mealProduct.setId(id);
        return mealProduct;
    }
}
