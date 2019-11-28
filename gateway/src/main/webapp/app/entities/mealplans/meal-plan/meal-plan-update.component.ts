import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMealPlan, MealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from './meal-plan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MealUpdateComponent } from 'app/entities/mealplans/meal';
import { MealTypeService } from 'app/entities/recipes/meal-type';
import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { IProduct } from 'app/shared/model/products/product.model';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from 'app/entities/recipes/recipe';
import { ProductService } from 'app/entities/products/product';
import { Account, AccountService, JhiLanguageHelper, UserService } from 'app/core';
import { JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { BasicNutritionResponse, IBasicNutritionResponse } from 'app/shared/model/mealplans/basic-nutrition-response.model';
import { BasicNutritionType } from 'app/shared/model/mealplans/enum/basic-nutritions.enum';
import { CaloriesConverterService } from 'app/entities/mealplans/meal-plan/calories-converter.service';

@Component({
  selector: 'jhi-meal-plan-update',
  templateUrl: './meal-plan-update.component.html'
})
export class MealPlanUpdateComponent implements OnInit {
  isSaving: boolean;
  creationTimestampDp: any;
  lastEditTimestampDp: any;
  mealTypes: IMealType[];
  languages: string[] = [];
  dayBasicNutritionResponses: BasicNutritionResponse[] = [];

  editForm = this.fb.group({
    id: [],
    authorId: [null],
    creationTimestamp: [null],
    lastEditTimestamp: [null],
    name: [null, [Validators.minLength(1), Validators.maxLength(255)]],
    isFinal: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    numberOfDays: [7, [Validators.required, Validators.min(1), Validators.max(31)]],
    numberOfMealsPerDay: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    totalDailyEnergy: [null, [Validators.required, Validators.min(1)]],
    percentOfProtein: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    percentOfFat: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    percentOfCarbohydrates: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    mealDefinitions: this.fb.array([]),
    days: this.fb.array([])
  });

  constructor(
    protected mealPlanService: MealPlanService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected mealTypeService: MealTypeService,
    protected jhiAlertService: JhiAlertService,
    protected recipeService: RecipeService,
    protected productService: ProductService,
    private accountService: AccountService,
    private userService: UserService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    protected caloriesConverter: CaloriesConverterService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.userService.find(account.login).subscribe(res => {
        this.editForm.patchValue({ authorId: res.body.id });
      });
    });
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealPlan }) => {
      console.log(mealPlan);
      this.updateForm(mealPlan);
    });
    this.mealTypeService
      .query()
      .subscribe((res: HttpResponse<IMealType[]>) => (this.mealTypes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.editForm.get('numberOfMealsPerDay').valueChanges.subscribe(numberOfMeals => this.numberOfMealsPerDayChanged());
    this.editForm.get('numberOfDays').valueChanges.subscribe(numberOfDays => this.numberOfDaysChanged());

    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
    // this.languageService.getCurrent().then(res => this.changeLanguage(res));
    // this.languageHelper.language.subscribe((languageKey: string) => this.changeLanguage(languageKey));
  }

  findProduct(day: FormGroup, mealProduct: FormGroup): void {
    this.productService.find(mealProduct.get('productId').value).subscribe(
      (res: HttpResponse<IProduct>) => {
        mealProduct.patchValue({ product: res.body });
        this.getNutritionData(day);
      },
      (res: HttpErrorResponse) => mealProduct.patchValue({ product: null })
    );
  }

  findRecipe(day: FormGroup, mealRecipe: FormGroup): void {
    this.recipeService.find(mealRecipe.get('recipeId').value).subscribe(
      (res: HttpResponse<IRecipe>) => {
        mealRecipe.patchValue({ recipe: res.body });
        this.getNutritionData(day);
      },
      (res: HttpErrorResponse) => mealRecipe.patchValue({ recipe: null })
    );
  }

  getHouseholdMeasure(mealProduct: FormGroup): string {
    let result = 'g';
    if (mealProduct.get('householdMeasureId').value) {
      const product = mealProduct.get('product').value;
      if (product) {
        const householdMeasure = product.householdMeasures.find(measure => measure.id === mealProduct.get('householdMeasureId').value);
        if (householdMeasure) {
          result = householdMeasure.description;
        }
      }
    }
    return result;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  getMealDefinitionsFormArray() {
    return this.editForm.get('mealDefinitions') as FormArray;
  }

  getMealDefinitionsFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      mealTypeId: [null, [Validators.required]],
      timeOfMeal: ['12:00', [Validators.required]],
      percentOfEnergy: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  getNutritionData(day: FormGroup): IBasicNutritionResponse {
    const result = new BasicNutritionResponse(0, 0, 0, 0, 0);
    for (const meal of this.getMealsFormArray(day).controls) {
      result.addNutritions(this.getNutritionDataForMeal(meal as FormGroup));
    }
    result.floor();
    this.dayBasicNutritionResponses[day.get('ordinalNumber').value] = result;
    return result;
  }

  getNutritionDataForMeal(meal: FormGroup) {
    const result = new BasicNutritionResponse(0, 0, 0, 0, 0);
    for (const mealProduct of this.getMealProductsFormArray(meal).controls) {
      if (mealProduct.get('product').value) {
        const product = mealProduct.get('product').value;
        const scale =
          (mealProduct.get('amount').value *
            (mealProduct.get('householdMeasureId').value
              ? product.householdMeasures.find(measure => measure.id === mealProduct.get('householdMeasureId').value).gramsWeight
              : 1)) /
          100;
        result.weight += scale * 100;
        result.energy += product.basicNutritionData.energy * scale;
        result.fat += product.basicNutritionData.fat * scale;
        result.carbohydrates += product.basicNutritionData.carbohydrates * scale;
        result.protein += product.basicNutritionData.protein * scale;
      }
    }
    for (const mealRecipe of this.getMealRecipesFormArray(meal).controls) {
      if (mealRecipe.get('recipe').value) {
        const recipe = mealRecipe.get('recipe').value;
        const amount = mealRecipe.get('amount').value ? mealRecipe.get('amount').value : 0;
        const scale = amount / 100;
        result.weight += amount;
        result.energy += recipe.basicNutritionData.energy * scale;
        result.fat += recipe.basicNutritionData.fat * scale;
        result.carbohydrates += recipe.basicNutritionData.carbohydrates * scale;
        result.protein += recipe.basicNutritionData.protein * scale;
      }
    }
    result.floor();
    return result;
  }

  calcPercent(currentValue: number, desiredValue: number): number {
    return Math.floor((currentValue / desiredValue - 1) * 100);
  }

  getSummaryIcon(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
    const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.getDailyValue(nutritionKey));
    if (Math.abs(percent) <= 3) {
      return 'check-circle';
    } else if (percent > 3) {
      return 'arrow-circle-up';
    } else {
      return 'arrow-circle-down';
    }
  }

  getSummaryButtonClass(nutritionData: IBasicNutritionResponse, nutritionKey: string): string {
    const percent = this.calcPercent(this.getNutritionValue(nutritionData, nutritionKey), this.getDailyValue(nutritionKey));
    if (Math.abs(percent) <= 3) {
      return 'btn-success';
    } else if (Math.abs(percent) <= 6) {
      return 'btn-warning';
    } else {
      return 'btn-danger';
    }
  }

  getNutritionValue(nutritionData: IBasicNutritionResponse, nutritionKey: string) {
    switch (BasicNutritionType[nutritionKey]) {
      case BasicNutritionType.Energy:
        return nutritionData.energy;
      case BasicNutritionType.Carbohydrates:
        return nutritionData.carbohydrates;
      case BasicNutritionType.Fat:
        return nutritionData.fat;
      case BasicNutritionType.Protein:
        return nutritionData.protein;
    }
  }

  getBasicNutritionsKeys(): string[] {
    return Object.keys(BasicNutritionType);
  }

  getExpectedDailyCarbohydrates(): number {
    return Math.floor(
      this.caloriesConverter.calcCarbohydrateGrams(
        (this.editForm.get('percentOfCarbohydrates').value * this.editForm.get('totalDailyEnergy').value) / 100
      )
    );
  }

  getExpectedDailyEnergy(): number {
    return Math.floor(this.editForm.get('totalDailyEnergy').value);
  }

  getExpectedDailyFat(): number {
    return Math.floor(
      this.caloriesConverter.calcFatGrams((this.editForm.get('percentOfFat').value * this.editForm.get('totalDailyEnergy').value) / 100)
    );
  }

  getExpectedDailyProtein(): number {
    return Math.floor(
      this.caloriesConverter.calcProteinGrams(
        (this.editForm.get('percentOfProtein').value * this.editForm.get('totalDailyEnergy').value) / 100
      )
    );
  }

  getDailyValue(nutritionKey: string) {
    switch (BasicNutritionType[nutritionKey]) {
      case BasicNutritionType.Energy:
        return this.getExpectedDailyEnergy();
      case BasicNutritionType.Carbohydrates:
        return this.getExpectedDailyCarbohydrates();
      case BasicNutritionType.Fat:
        return this.getExpectedDailyFat();
      case BasicNutritionType.Protein:
        return this.getExpectedDailyProtein();
    }
  }

  getDaysFormArray() {
    return this.editForm.get('days') as FormArray;
  }

  getDaysFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      meals: this.fb.array([])
    });
  }

  getMealsFormArray(day: FormGroup) {
    return day.get('meals') as FormArray;
  }

  getMealsFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      mealRecipes: this.fb.array([]),
      mealProducts: this.fb.array([])
    });
  }

  getMealRecipesFormArray(meal: FormGroup) {
    return meal.get('mealRecipes') as FormArray;
  }

  getMealRecipesFormGroup() {
    return this.fb.group({
      id: [],
      recipeId: [null, [Validators.required]],
      recipe: [],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  getMealProductsFormArray(meal: FormGroup) {
    return meal.get('mealProducts') as FormArray;
  }

  getMealProductsFormGroup() {
    return this.fb.group({
      id: [],
      productId: [null, [Validators.required]],
      product: [],
      householdMeasureId: [],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  updateForm(mealPlan: IMealPlan) {
    this.editForm.patchValue({
      id: mealPlan.id,
      authorId: mealPlan.authorId,
      creationTimestamp: mealPlan.creationTimestamp,
      lastEditTimestamp: mealPlan.lastEditTimestamp,
      name: mealPlan.name,
      isFinal: mealPlan.isFinal,
      language: mealPlan.language,
      numberOfDays: mealPlan.numberOfDays,
      numberOfMealsPerDay: mealPlan.numberOfMealsPerDay,
      totalDailyEnergy: mealPlan.totalDailyEnergy,
      percentOfProtein: mealPlan.percentOfProtein,
      percentOfFat: mealPlan.percentOfFat,
      percentOfCarbohydrates: mealPlan.percentOfCarbohydrates
    });

    if (mealPlan.days) {
      for (const day of mealPlan.days) {
        const daysFormGroup = this.getDaysFormGroup();
        if (day.meals) {
          for (const meal of day.meals) {
            const mealsFormGroup = this.getMealsFormGroup();
            const mealProductsFormArray = this.getMealProductsFormArray(mealsFormGroup);
            const mealRecipesFormArray = this.getMealRecipesFormArray(mealsFormGroup);
            if (meal.mealProducts) {
              for (const product of meal.mealProducts) {
                mealProductsFormArray.push(this.getMealProductsFormGroup());
              }
            }
            if (meal.mealRecipes) {
              for (const recipe of meal.mealRecipes) {
                mealRecipesFormArray.push(this.getMealRecipesFormGroup());
              }
            }
            this.getMealsFormArray(daysFormGroup).push(mealsFormGroup);
          }
        }
        this.getDaysFormArray().push(daysFormGroup);
      }
      this.getDaysFormArray().patchValue(mealPlan.days);
    }
    if (mealPlan.mealDefinitions) {
      const mealDefinitionsFormArray = this.getMealDefinitionsFormArray();
      for (const mealDefinition of mealPlan.mealDefinitions) {
        mealDefinitionsFormArray.push(this.getMealDefinitionsFormGroup());
      }
      mealDefinitionsFormArray.patchValue(mealPlan.mealDefinitions);
    }
    if (!this.editForm.get('numberOfDays').value) {
      this.editForm.get('numberOfDays').patchValue(7);
    }
    if (!this.editForm.get('numberOfMealsPerDay').value) {
      this.editForm.get('numberOfMealsPerDay').patchValue(5);
    }
    this.numberOfDaysChanged();
    console.log(this.editForm);
    this.updateMeals();
  }

  updateMeals() {
    for (const day of this.getDaysFormArray().controls) {
      for (const meal of this.getMealsFormArray(day as FormGroup).controls) {
        for (const mealProduct of this.getMealProductsFormArray(meal as FormGroup).controls) {
          this.findProduct(day as FormGroup, mealProduct as FormGroup);
        }
        for (const mealRecipe of this.getMealRecipesFormArray(meal as FormGroup).controls) {
          this.findRecipe(day as FormGroup, mealRecipe as FormGroup);
        }
      }
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealPlan = this.createFromForm();
    console.log('saving');
    console.log(mealPlan);
    if (mealPlan.id !== undefined) {
      this.subscribeToSaveResponse(this.mealPlanService.update(mealPlan));
    } else {
      this.subscribeToSaveResponse(this.mealPlanService.create(mealPlan));
    }
  }

  private createFromForm(): IMealPlan {
    return {
      ...new MealPlan(),
      id: this.editForm.get(['id']).value,
      authorId: this.editForm.get(['authorId']).value,
      creationTimestamp: this.editForm.get(['creationTimestamp']).value,
      lastEditTimestamp: this.editForm.get(['lastEditTimestamp']).value,
      name: this.editForm.get(['name']).value,
      isFinal: this.editForm.get(['isFinal']).value,
      language: this.editForm.get(['language']).value,
      numberOfDays: this.editForm.get(['numberOfDays']).value,
      numberOfMealsPerDay: this.editForm.get(['numberOfMealsPerDay']).value,
      totalDailyEnergy: this.editForm.get(['totalDailyEnergy']).value,
      percentOfProtein: this.editForm.get(['percentOfProtein']).value,
      percentOfFat: this.editForm.get(['percentOfFat']).value,
      percentOfCarbohydrates: this.editForm.get(['percentOfCarbohydrates']).value,
      days: this.editForm.get(['days']).value,
      mealDefinitions: this.editForm.get(['mealDefinitions']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlan>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  numberOfDaysChanged() {
    const daysFormArray = this.getDaysFormArray();
    const numberOfDays = this.editForm.get('numberOfDays').value;
    if (numberOfDays && numberOfDays > 0) {
      if (numberOfDays !== daysFormArray.controls.length) {
        for (let i = daysFormArray.controls.length - 1; i >= numberOfDays; --i) {
          daysFormArray.removeAt(i);
        }
        for (let i = daysFormArray.controls.length; i < numberOfDays; ++i) {
          const daysFormGroup = this.getDaysFormGroup();
          daysFormGroup.patchValue({ ordinalNumber: i + 1 });
          daysFormArray.push(daysFormGroup);
        }
        this.numberOfMealsPerDayChanged();
      }
    }
  }

  numberOfMealsPerDayChanged() {
    const numberOfMeals = this.editForm.get('numberOfMealsPerDay').value;
    const mealDefinitionsFormArray = this.getMealDefinitionsFormArray();
    if (numberOfMeals && numberOfMeals > 0) {
      if (mealDefinitionsFormArray.controls.length !== numberOfMeals) {
        for (let i = mealDefinitionsFormArray.controls.length - 1; i >= numberOfMeals; --i) {
          mealDefinitionsFormArray.removeAt(i);
        }
        for (let i = mealDefinitionsFormArray.controls.length; i < numberOfMeals; ++i) {
          const mealDefinitionsFormGroup = this.getMealDefinitionsFormGroup();
          mealDefinitionsFormGroup.patchValue({ ordinalNumber: i + 1 });
          mealDefinitionsFormArray.push(mealDefinitionsFormGroup);
        }
      }

      if (this.editForm.get('numberOfDays').value) {
        if (this.getDaysFormArray().controls.length !== this.editForm.get('numberOfDays').value) {
          this.numberOfDaysChanged();
        } else {
          for (const day of this.getDaysFormArray().controls) {
            const mealsFormArray = this.getMealsFormArray(day as FormGroup);
            if (mealsFormArray.controls.length !== numberOfMeals) {
              for (let i = mealsFormArray.controls.length - 1; i >= numberOfMeals; --i) {
                mealsFormArray.removeAt(i);
              }
              for (let i = mealsFormArray.controls.length; i < numberOfMeals; ++i) {
                const mealsFormGroup = this.getMealsFormGroup();
                mealsFormGroup.patchValue({ ordinalNumber: i + 1 });
                mealsFormArray.push(mealsFormGroup);
              }
            }
          }
        }
      }
    }
  }

  editMeal(day: FormGroup, meal: FormGroup) {
    const modalRef = this.modalService.open(MealUpdateComponent, { windowClass: 'custom-modal' });
    modalRef.componentInstance.expectedEnergy =
      this.getMealDefinitionsFormArray().controls[meal.get('ordinalNumber').value - 1].get('percentOfEnergy').value *
      this.editForm.get('totalDailyEnergy').value;

    modalRef.componentInstance.meal = meal;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: FormGroup) => {
      modalRef.close();

      // meal.mealRecipes = receivedEntry.mealRecipes;
      // meal.mealProducts = receivedEntry.mealProducts;
      // this.findMealProductsAndRecipes(meal);
      this.getNutritionData(day);
    });

    // modalRef.result.then(
    //   () => this.findMealProductsAndRecipes(meal),
    //   () => this.findMealProductsAndRecipes(meal)
    // );
  }

  //
  // findMealProductsAndRecipes(meal: IMeal) {
  //   if (meal.mealProducts) {
  //     for (const product of meal.mealProducts) {
  //       this.findProduct(product);
  //     }
  //   }
  //   if (meal.mealRecipes) {
  //     for (const recipe of meal.mealRecipes) {
  //       this.findRecipe(recipe);
  //     }
  //   }
  // }

  // findProductsAndRecipes(): void {
  //   if (this.mealPlan.days) {
  //     for (const day of this.mealPlan.days) {
  //       if (day.meals) {
  //         for (const meal of day.meals) {
  //           this.findMealProductsAndRecipes(meal);
  //         }
  //       }
  //     }
  //   }
  // }
  //
  // findProduct(mealProduct: IMealProduct): void {
  //   this.productService.find(mealProduct.productId).subscribe(
  //     (res: HttpResponse<IProduct>) => mealProduct.product = res.body,
  //     (res: HttpErrorResponse) => mealProduct.product = null
  //   );
  //   this.productService.getBasicNutrtions([new BasicNutritionRequest(mealProduct.productId, mealProduct.amount, mealProduct.householdMeasureId)])
  //     .subscribe((res: HttpResponse<IBasicNutritionResponse>) => {
  //       mealProduct.basicNutritionData = res.body;
  //       this.updateDays();
  //     });
  // }
  //
  // findRecipe(mealRecipe: IMealRecipe): void {
  //   this.recipeService.find(mealRecipe.recipeId).subscribe(
  //     (res: HttpResponse<IRecipe>) => {
  //       mealRecipe.recipe = res.body;
  //       const request: IBasicNutritionRequest[] = [];
  //       for (const section of mealRecipe.recipe.recipeSections) {
  //         for (const portion of section.productPortions) {
  //           request.push(new BasicNutritionRequest(portion.productId, portion.amount, portion.householdMeasureId));
  //         }
  //       }
  //       this.productService.getBasicNutrtions(request)
  //         .subscribe((res2: HttpResponse<IBasicNutritionResponse>) => {
  //           mealRecipe.basicNutritionData = new BasicNutritionResponse(0, 0, 0, 0, 0);
  //           mealRecipe.basicNutritionData.addNutritions(res2.body);
  //
  //           mealRecipe.basicNutritionData.scaleForWeight(mealRecipe.amount);
  //           this.updateDays();
  //         });
  //     },
  //     (res: HttpErrorResponse) => mealRecipe.recipe = null
  //   );
  // }
}
