package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.CustomNutritionalInterviewQuestionTemplateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CustomNutritionalInterviewQuestionTemplate} and its DTO {@link CustomNutritionalInterviewQuestionTemplateDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomNutritionalInterviewQuestionTemplateMapper extends EntityMapper<CustomNutritionalInterviewQuestionTemplateDTO, CustomNutritionalInterviewQuestionTemplate> {



    default CustomNutritionalInterviewQuestionTemplate fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate = new CustomNutritionalInterviewQuestionTemplate();
        customNutritionalInterviewQuestionTemplate.setId(id);
        return customNutritionalInterviewQuestionTemplate;
    }
}
