import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MailableDay, MailableMeal, MailableMealPlan, MailableProduct } from 'app/shared/model/appointments/mailable-meal-plan.model';
import { MealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { AppointmentService } from 'app/entities/appointments/appointment';
import { ProductService } from 'app/entities/products/product';
import { IProduct } from 'app/shared/model/products/product.model';
import { HttpResponse } from '@angular/common/http';
import { RecipeService } from 'app/entities/recipes/recipe';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';

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
  queueItems: number;
  processedItems: number;

  constructor(
    private appointmentService: AppointmentService,
    private productService: ProductService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {}

  send() {
    this.isSending = true;
    this.queueItems = 0;
    this.processedItems = 0;
    const mailableMealPlan = new MailableMealPlan();
    mailableMealPlan.recipientEmail = this.recipient;
    mailableMealPlan.days = [];
    for (const day of this.mealPlan.days) {
      const mailableDay = new MailableDay(day.ordinalNumber);
      for (const meal of day.meals) {
        const mailableMeal = new MailableMeal(meal.ordinalNumber);
        for (const mealProduct of meal.mealProducts) {
          this.queueItems++;
          this.productService.find(mealProduct.id).subscribe((res: HttpResponse<IProduct>) => {
            const product = res.body;

            product.householdMeasures.find(measure => measure.id === mealProduct.householdMeasureId);
            const householdMeasureDescription = mealProduct.householdMeasureId
              ? product.householdMeasures.find(measure => measure.id === mealProduct.householdMeasureId).description
              : 'g';
            mailableMeal.products.push(new MailableProduct(product.description, householdMeasureDescription, mealProduct.amount));
            this.processedItems++;
          });
        }
        for (const mealRecipe of meal.mealRecipes) {
          this.queueItems++;
          this.recipeService.find(mealRecipe.id).subscribe((res: HttpResponse<IRecipe>) => {
            const recipe = res.body;
            mailableMeal.recipes.push(new MailableProduct(recipe.name, 'g', mealRecipe.amount));
            this.processedItems++;
          });
        }
        mailableDay.meals.push(mailableMeal);
      }
      mailableMealPlan.days.push(mailableDay);
    }
    this.trySending(mailableMealPlan);
  }

  private trySending(mailableMealPlan: MailableMealPlan) {
    if (this.queueItems === this.processedItems) {
      console.log('sent');
      this.appointmentService.sendMealPlan(mailableMealPlan).subscribe();
      this.passEntry.emit(true);
    } else {
      setTimeout(() => this.trySending(mailableMealPlan), 1000);
    }
  }
}
