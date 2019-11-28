import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils, JhiLanguageService } from 'ng-jhipster';
import * as moment from 'moment';
import { IRecipe, Recipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from './recipe.service';
import { IRecipeBasicNutritionData, RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { KitchenApplianceService } from 'app/entities/recipes/kitchen-appliance';
import { IDishType } from 'app/shared/model/recipes/dish-type.model';
import { DishTypeService } from 'app/entities/recipes/dish-type';
import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { MealTypeService } from 'app/entities/recipes/meal-type';
import { IProduct, Product } from 'app/shared/model/products/product.model';
import { ProductComponent, ProductService } from 'app/entities/products/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account, AccountService, JhiLanguageHelper, UserService } from 'app/core';
import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

@Component({
  selector: 'jhi-recipe-update',
  templateUrl: './recipe-update.component.html'
})
export class RecipeUpdateComponent implements OnInit {
  isSaving: boolean;

  basicnutritiondata: IRecipeBasicNutritionData[];

  recipes: IRecipe[];

  kitchenappliances: IKitchenAppliance[];

  dishtypes: IDishType[];

  mealtypes: IMealType[];
  creationTimestampDp: any;
  lastEditTimestampDp: any;

  languages: any[];
  lang = 'en';

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    preparationTimeMinutes: [null, [Validators.required, Validators.min(0)]],
    numberOfPortions: [null, [Validators.required, Validators.min(0)]],
    image: [null, []],
    imageContentType: [],
    authorId: [],
    creationTimestamp: [],
    lastEditTimestamp: [],
    isFinal: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    totalGramsWeight: [],
    basicNutritionData: this.fb.group({
      id: [],
      energy: [],
      protein: [],
      fat: [],
      carbohydrates: []
    }),
    recipeSections: this.fb.array([]),
    sourceRecipe: [],
    kitchenAppliances: [],
    dishTypes: [],
    mealTypes: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected recipeService: RecipeService,
    protected kitchenApplianceService: KitchenApplianceService,
    protected dishTypeService: DishTypeService,
    protected mealTypeService: MealTypeService,
    protected productService: ProductService,
    protected modalService: NgbModal,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.accountService.identity().then((account: Account) => {
      this.userService.find(account.login).subscribe(res => {
        this.editForm.patchValue({ authorId: res.body.id });
      });
    });
    this.activatedRoute.data.subscribe(({ recipe }) => {
      if (!recipe.basicNutritionData) {
        recipe.basicNutritionData = new RecipeBasicNutritionData();
      }
      console.log(recipe);
      this.updateForm(recipe);
      console.log(this.editForm);
    });

    this.recipeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipe[]>) => response.body)
      )
      .subscribe((res: IRecipe[]) => (this.recipes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.kitchenApplianceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IKitchenAppliance[]>) => mayBeOk.ok),
        map((response: HttpResponse<IKitchenAppliance[]>) => response.body)
      )
      .subscribe((res: IKitchenAppliance[]) => (this.kitchenappliances = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dishTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDishType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDishType[]>) => response.body)
      )
      .subscribe((res: IDishType[]) => (this.dishtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.mealTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealType[]>) => response.body)
      )
      .subscribe((res: IMealType[]) => (this.mealtypes = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
    this.languageService.getCurrent().then(res => this.changeLanguage(res));
    this.languageHelper.language.subscribe((languageKey: string) => this.changeLanguage(languageKey));
  }

  updateForm(recipe: IRecipe) {
    this.editForm.patchValue({
      id: recipe.id,
      name: recipe.name,
      preparationTimeMinutes: recipe.preparationTimeMinutes,
      numberOfPortions: recipe.numberOfPortions,
      image: recipe.image,
      imageContentType: recipe.imageContentType,
      authorId: recipe.authorId,
      creationTimestamp: recipe.creationTimestamp,
      lastEditTimestamp: recipe.lastEditTimestamp,
      isFinal: recipe.isFinal,
      language: recipe.language,
      totalGramsWeight: recipe.totalGramsWeight,
      basicNutritionData: recipe.basicNutritionData,
      sourceRecipe: recipe.sourceRecipe,
      kitchenAppliances: recipe.kitchenAppliances,
      dishTypes: recipe.dishTypes,
      mealTypes: recipe.mealTypes
    });
    if (recipe.recipeSections) {
      for (let i = 0; i < recipe.recipeSections.length; ++i) {
        const recipeSectionsFormGroup = this.getRecipeSectionsFormGroup();
        for (let j = 0; j < recipe.recipeSections[i].productPortions.length; ++j) {
          this.getProductPortionsFormArray(recipeSectionsFormGroup).push(this.getProductPortionsFormGroup());
        }
        for (let j = 0; j < recipe.recipeSections[i].preparationSteps.length; ++j) {
          this.getPreparationStepsFormArray(recipeSectionsFormGroup).push(this.getPreparationStepsFormGroup());
        }
        this.getRecipeSectionsFormArray().push(recipeSectionsFormGroup);
      }
      this.getRecipeSectionsFormArray().patchValue(recipe.recipeSections);
      for (const section of this.getRecipeSectionsFormArray().controls) {
        for (const productPortion of this.getProductPortionsFormArray(section as FormGroup).controls) {
          this.findProduct(productPortion as FormGroup);
        }
      }
    }
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipe = this.createFromForm();
    this.calcRecipeBasicNutritionData(recipe);
    for (const section of recipe.recipeSections) {
      section.preparationSteps = section.preparationSteps.filter(
        step => step.stepDescription && (step.stepDescription as string).trim().length > 0
      );
      for (let i = 0; i < section.preparationSteps.length; ++i) {
        section.preparationSteps[i].ordinalNumber = i + 1;
      }
    }
    recipe.recipeSections = recipe.recipeSections.filter(
      section =>
        (section.preparationSteps && section.preparationSteps.length > 0) || (section.productPortions && section.productPortions.length > 0)
    );

    console.log(recipe);
    if (recipe.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeService.update(recipe));
    } else {
      this.subscribeToSaveResponse(this.recipeService.create(recipe));
    }
  }

  private calcRecipeBasicNutritionData(recipe: IRecipe) {
    const basicNutritionData = new RecipeBasicNutritionData(null, 0, 0, 0, 0);
    recipe.totalGramsWeight = 0;
    for (const recipeSection of this.getRecipeSectionsFormArray().controls) {
      for (const productPortion of this.getProductPortionsFormArray(recipeSection as FormGroup).controls) {
        const product = productPortion.get('product').value as IProduct;
        const householdMeasureId = productPortion.get('householdMeasureId').value;
        const amount = productPortion.get('amount').value;

        const scale = householdMeasureId ? product.householdMeasures.find(measure => measure.id === householdMeasureId).gramsWeight : 1;
        const portionGramsWeight = amount * scale;
        recipe.totalGramsWeight += portionGramsWeight;
        basicNutritionData.energy += (product.basicNutritionData.energy * portionGramsWeight) / 100;
        basicNutritionData.fat += (product.basicNutritionData.fat * portionGramsWeight) / 100;
        basicNutritionData.protein += (product.basicNutritionData.protein * portionGramsWeight) / 100;
        basicNutritionData.carbohydrates += (product.basicNutritionData.carbohydrates * portionGramsWeight) / 100;
      }
    }
    recipe.totalGramsWeight = Math.floor(recipe.totalGramsWeight);
    basicNutritionData.energy = Math.floor(basicNutritionData.energy);
    basicNutritionData.fat = Math.floor(basicNutritionData.fat);
    basicNutritionData.protein = Math.floor(basicNutritionData.protein);
    basicNutritionData.carbohydrates = Math.floor(basicNutritionData.carbohydrates);
    recipe.basicNutritionData = basicNutritionData;
  }

  private createFromForm(): IRecipe {
    return {
      ...new Recipe(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      preparationTimeMinutes: this.editForm.get(['preparationTimeMinutes']).value,
      numberOfPortions: this.editForm.get(['numberOfPortions']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      authorId: this.editForm.get(['authorId']).value,
      creationTimestamp: this.editForm.get(['creationTimestamp']).value,
      lastEditTimestamp: this.editForm.get(['lastEditTimestamp']).value,
      isFinal: this.editForm.get(['isFinal']).value,
      language: this.editForm.get(['language']).value,
      totalGramsWeight: this.editForm.get(['totalGramsWeight']).value,
      basicNutritionData: this.editForm.get(['basicNutritionData']).value,
      sourceRecipe: this.editForm.get(['sourceRecipe']).value,
      kitchenAppliances: this.editForm.get(['kitchenAppliances']).value,
      dishTypes: this.editForm.get(['dishTypes']).value,
      mealTypes: this.editForm.get(['mealTypes']).value,
      recipeSections: this.editForm.get(['recipeSections']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipe>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRecipeBasicNutritionDataById(index: number, item: IRecipeBasicNutritionData) {
    return item.id;
  }

  trackRecipeById(index: number, item: IRecipe) {
    return item.id;
  }

  trackKitchenApplianceById(index: number, item: IKitchenAppliance) {
    return item.id;
  }

  trackDishTypeById(index: number, item: IDishType) {
    return item.id;
  }

  trackMealTypeById(index: number, item: IMealType) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  findProduct(productPortion: FormGroup): void {
    this.productService
      .find(productPortion.get('productId').value)
      .subscribe(
        (res: HttpResponse<IProduct>) => productPortion.patchValue({ product: res.body }),
        (res: HttpErrorResponse) => productPortion.patchValue({ product: null })
      );
  }

  addIngredient(recipeSection: FormGroup) {
    const modalRef = this.modalService.open(ProductComponent, { windowClass: 'custom-modal' });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: Product) => {
      modalRef.close();

      const productPortionsFormGroup = this.getProductPortionsFormGroup();
      productPortionsFormGroup.patchValue({ productId: receivedEntry.id });
      this.getProductPortionsFormArray(recipeSection).push(productPortionsFormGroup);
      this.findProduct(productPortionsFormGroup);
    });
  }

  removeIngredientFromSection(recipeSection: FormGroup, portionIndex: number): void {
    this.getProductPortionsFormArray(recipeSection).removeAt(portionIndex);
  }

  removePreparationStepFromSection(recipeSection: FormGroup, preparationIndex: number) {
    this.getPreparationStepsFormArray(recipeSection).removeAt(preparationIndex);
  }

  updatePreparationSteps(recipeSection: FormGroup) {
    const preparationStepsArray = this.getPreparationStepsFormArray(recipeSection);
    for (let i = preparationStepsArray.length - 1; i >= 0; --i) {
      if (!preparationStepsArray.controls[i].get('stepDescription').value) {
        preparationStepsArray.removeAt(i);
      }
    }
    preparationStepsArray.push(this.getPreparationStepsFormGroup());
    recipeSection.setControl('preparationSteps', preparationStepsArray);
  }

  getRecipeSectionsFormArray(): FormArray {
    return this.editForm.get('recipeSections') as FormArray;
  }

  getRecipeSectionsFormGroup() {
    return this.fb.group({
      id: [],
      sectionName: [null, [Validators.minLength(1), Validators.maxLength(255)]],
      productPortions: this.fb.array([]),
      preparationSteps: this.fb.array([this.getPreparationStepsFormGroup()])
    });
  }

  getPreparationStepsFormArray(recipeSection: FormGroup): FormArray {
    return recipeSection.get('preparationSteps') as FormArray;
  }

  getPreparationStepsFormGroup() {
    return this.fb.group({
      id: [],
      ordinalNumber: [],
      stepDescription: []
    });
  }

  getProductPortionsFormArray(recipeSection: FormGroup): FormArray {
    return recipeSection.get('productPortions') as FormArray;
  }

  getProductPortionsFormGroup() {
    return this.fb.group({
      id: [],
      amount: [null, [Validators.required, Validators.min(0)]],
      productId: [null, [Validators.required]],
      householdMeasureId: [],
      product: []
    });
  }

  addSection() {
    this.getRecipeSectionsFormArray().push(this.getRecipeSectionsFormGroup());
  }

  removeRecipeSection(sectionIndex: number) {
    this.getRecipeSectionsFormArray().removeAt(sectionIndex);
  }

  changeLanguage(newLang: string) {
    if (newLang !== undefined && newLang !== this.lang) {
      this.lang = newLang;
      this.reloadTranslations();
    }
  }

  private reloadTranslations() {
    this.mealtypes = [...this.mealtypes];
    this.dishtypes = [...this.dishtypes];
    this.kitchenappliances = [...this.kitchenappliances];
  }

  getMealTypeTranslation(mealType: IMealType): string {
    const productCategoryTranslation: IProductCategoryTranslation = mealType.translations.find(
      translation => translation.language === this.lang
    );
    return productCategoryTranslation ? productCategoryTranslation.translation : mealType.name;
  }

  getDishTypeTranslation(dishType: IDishType): string {
    const productCategoryTranslation: IProductCategoryTranslation = dishType.translations.find(
      translation => translation.language === this.lang
    );
    return productCategoryTranslation ? productCategoryTranslation.translation : dishType.description;
  }

  getKitchenApplianceTranslation(kitchenAppliance: IKitchenAppliance): string {
    const productCategoryTranslation: IProductCategoryTranslation = kitchenAppliance.translations.find(
      translation => translation.language === this.lang
    );
    return productCategoryTranslation ? productCategoryTranslation.translation : kitchenAppliance.name;
  }
}
