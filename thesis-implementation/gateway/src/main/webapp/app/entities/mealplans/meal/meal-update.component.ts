import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ProductComponent, ProductService } from 'app/entities/products/product';
import { RecipeComponent, RecipeService } from 'app/entities/recipes/recipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct, Product } from 'app/shared/model/products/product.model';
import { Recipe } from 'app/shared/model/recipes/recipe.model';

@Component({
  selector: 'jhi-meal-update',
  templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
  isSaving: boolean;

  @Input() meal: FormGroup;
  @Output() passEntry: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected productService: ProductService,
    protected recipeService: RecipeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  passBack(): void {
    this.passEntry.emit(this.meal);
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  getMealRecipesFormArray() {
    return this.meal.get('mealRecipes') as FormArray;
  }

  getMealRecipesFormGroup() {
    return this.fb.group({
      id: [],
      recipeId: [null, [Validators.required]],
      recipe: [],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  getMealProductsFormArray() {
    return this.meal.get('mealProducts') as FormArray;
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

  addIngredient() {
    const modalRef = this.modalService.open(ProductComponent, { windowClass: 'custom-modal' });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: Product) => {
      modalRef.close();

      const mealProductsFormGroup = this.getMealProductsFormGroup();
      mealProductsFormGroup.patchValue({ productId: receivedEntry.id, product: receivedEntry });
      this.getMealProductsFormArray().push(mealProductsFormGroup);
      this.findProduct(mealProductsFormGroup);
    });
  }

  removeIngredientFromMeal(index: number): void {
    this.getMealProductsFormArray().removeAt(index);
  }

  addRecipe() {
    const modalRef = this.modalService.open(RecipeComponent, { windowClass: 'custom-modal' });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: Recipe) => {
      modalRef.close();

      const mealRecipesFormGroup = this.getMealRecipesFormGroup();
      mealRecipesFormGroup.patchValue({ recipeId: receivedEntry.id, recipe: receivedEntry });
      this.getMealRecipesFormArray().push(mealRecipesFormGroup);
    });
  }

  removeRecipeFromMeal(index: number) {
    this.getMealRecipesFormArray().removeAt(index);
  }

  findProduct(ingredient: FormGroup): void {
    this.productService
      .find(ingredient.get('productId').value)
      .subscribe(
        (res: HttpResponse<IProduct>) => ingredient.patchValue({ product: res.body }),
        (res: HttpErrorResponse) => ingredient.patchValue({ product: null })
      );
  }
}
