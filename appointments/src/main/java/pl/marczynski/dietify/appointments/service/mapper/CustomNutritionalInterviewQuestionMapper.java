package pl.marczynski.dietify.appointments.service.mapper;

import pl.marczynski.dietify.appointments.domain.*;
import pl.marczynski.dietify.appointments.service.dto.CustomNutritionalInterviewQuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CustomNutritionalInterviewQuestion} and its DTO {@link CustomNutritionalInterviewQuestionDTO}.
 */
@Mapper(componentModel = "spring", uses = {NutritionalInterviewMapper.class})
public interface CustomNutritionalInterviewQuestionMapper extends EntityMapper<CustomNutritionalInterviewQuestionDTO, CustomNutritionalInterviewQuestion> {

    @Mapping(source = "nutritionalInterview.id", target = "nutritionalInterviewId")
    CustomNutritionalInterviewQuestionDTO toDto(CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion);

    @Mapping(source = "nutritionalInterviewId", target = "nutritionalInterview")
    CustomNutritionalInterviewQuestion toEntity(CustomNutritionalInterviewQuestionDTO customNutritionalInterviewQuestionDTO);

    default CustomNutritionalInterviewQuestion fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion = new CustomNutritionalInterviewQuestion();
        customNutritionalInterviewQuestion.setId(id);
        return customNutritionalInterviewQuestion;
    }
}
