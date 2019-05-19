import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MealPlan} from 'app/shared/model/meal-plan.model';
import {
    MailableDay,
    MailableMeal,
    MailableMealPlan,
    MailableProduct
} from 'app/shared/model/mailable-meal-plan.model';
import {MealPlanService} from 'app/entities/meal-plan';

@Component({
    selector: 'jhi-meal-plan-sender',
    templateUrl: './meal-plan-sender.component.html',
    styles: []
})
export class MealPlanSenderComponent implements OnInit {

    @Output() passEntry: EventEmitter<boolean> = new EventEmitter();

    mealPlan: MealPlan;
    isSending: boolean;
    recipient: string;

    constructor(private mealPlanService: MealPlanService) {
    }

    ngOnInit() {
    }

    send() {
        const mailableMealPlan = new MailableMealPlan();
        mailableMealPlan.recipientEmail = this.recipient;
        mailableMealPlan.days = [];
        for (const day of this.mealPlan.days) {
            const mailableDay = new MailableDay(day.ordinalNumber);
            for (const meal of day.meals) {
                const mailableMeal = new MailableMeal(meal.ordinalNumber);
                for (const product of meal.mealProducts) {
                    mailableMeal.products.push(new MailableProduct(product.product.description, product.householdMeasureDescription, product.amount));
                }
                for (const recipe of meal.mealRecipes) {
                    mailableMeal.recipes.push(new MailableProduct(recipe.recipe.name, 'g', recipe.amount));
                }
                mailableDay.meals.push(mailableMeal);
            }
            mailableMealPlan.days.push(mailableDay);
        }
        console.log('sent');
        console.log(mailableMealPlan);
        this.mealPlanService.sendMail(mailableMealPlan).subscribe();
        this.passEntry.emit(true);
    }
}
