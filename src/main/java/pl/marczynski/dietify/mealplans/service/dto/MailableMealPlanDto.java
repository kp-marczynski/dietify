package pl.marczynski.dietify.mealplans.service.dto;

import java.util.List;

public class MailableMealPlanDto {
    public String recipientEmail;
    public List<MailableDayDto> days;
}

class MailableDayDto {
    public Integer ordinalNumber;
    public List<MailableMealDto> meals;
}

class MailableMealDto {
    public Integer ordinalNumber;
    public List<MailableProductDto> products;
    public List<MailableRecipeDto> recipes;
}

class MailableProductDto {
    public String name;
    public String measureDescription;
    public Double amount;
}

class MailableRecipeDto extends MailableProductDto {
}
