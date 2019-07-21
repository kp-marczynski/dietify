package pl.marczynski.dietify.products.service.mapper;

import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.service.dto.HouseholdMeasureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link HouseholdMeasure} and its DTO {@link HouseholdMeasureDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface HouseholdMeasureMapper extends EntityMapper<HouseholdMeasureDTO, HouseholdMeasure> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.description", target = "productDescription")
    HouseholdMeasureDTO toDto(HouseholdMeasure householdMeasure);

    @Mapping(source = "productId", target = "product")
    HouseholdMeasure toEntity(HouseholdMeasureDTO householdMeasureDTO);

    default HouseholdMeasure fromId(Long id) {
        if (id == null) {
            return null;
        }
        HouseholdMeasure householdMeasure = new HouseholdMeasure();
        householdMeasure.setId(id);
        return householdMeasure;
    }
}
