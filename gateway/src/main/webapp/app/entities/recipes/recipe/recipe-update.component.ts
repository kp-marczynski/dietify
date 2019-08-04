import {Component, OnInit, ElementRef} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {FormArray, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';
import {IRecipe, Recipe} from 'app/shared/model/recipes/recipe.model';
import {RecipeService} from './recipe.service';
import {IRecipeBasicNutritionData} from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import {RecipeBasicNutritionDataService} from 'app/entities/recipes/recipe-basic-nutrition-data';
import {IKitchenAppliance} from 'app/shared/model/recipes/kitchen-appliance.model';
import {KitchenApplianceService} from 'app/entities/recipes/kitchen-appliance';
import {IDishType} from 'app/shared/model/recipes/dish-type.model';
import {DishTypeService} from 'app/entities/recipes/dish-type';
import {IMealType} from 'app/shared/model/recipes/meal-type.model';
import {MealTypeService} from 'app/entities/recipes/meal-type';
import {IProductPortion, ProductPortion} from 'app/shared/model/recipes/product-portion.model';
import {IProduct, Product} from 'app/shared/model/products/product.model';
import {IRecipeSection} from 'app/shared/model/recipes/recipe-section.model';
import {ProductComponent, ProductService} from 'app/entities/products/product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PreparationStep} from 'app/shared/model/recipes/preparation-step.model';

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
  creationDateDp: any;
  lastEditDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    preparationTimeMinutes: [null, [Validators.required, Validators.min(0)]],
    numberOfPortions: [null, [Validators.required, Validators.min(0)]],
    image: [null, []],
    imageContentType: [],
    authorId: [null, [Validators.required]],
    creationDate: [null, [Validators.required]],
    lastEditDate: [null, [Validators.required]],
    isVisible: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    totalGramsWeight: [null, [Validators.required, Validators.min(0)]],
    basicNutritionData: [null, Validators.required],
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
    protected recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
    protected kitchenApplianceService: KitchenApplianceService,
    protected dishTypeService: DishTypeService,
    protected mealTypeService: MealTypeService,
    protected productService: ProductService,
    protected modalService: NgbModal,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({recipe}) => {
      this.updateForm(recipe);
    });
    this.recipeBasicNutritionDataService
      .query({filter: 'recipe-is-null'})
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipeBasicNutritionData[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipeBasicNutritionData[]>) => response.body)
      )
      .subscribe(
        (res: IRecipeBasicNutritionData[]) => {
          if (!this.editForm.get('basicNutritionData').value || !this.editForm.get('basicNutritionData').value.id) {
            this.basicnutritiondata = res;
          } else {
            this.recipeBasicNutritionDataService
              .find(this.editForm.get('basicNutritionData').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRecipeBasicNutritionData>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRecipeBasicNutritionData>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRecipeBasicNutritionData) => (this.basicnutritiondata = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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
      creationDate: recipe.creationDate,
      lastEditDate: recipe.lastEditDate,
      isVisible: recipe.isVisible,
      language: recipe.language,
      totalGramsWeight: recipe.totalGramsWeight,
      basicNutritionData: recipe.basicNutritionData,
      sourceRecipe: recipe.sourceRecipe,
      kitchenAppliances: recipe.kitchenAppliances,
      dishTypes: recipe.dishTypes,
      mealTypes: recipe.mealTypes
    });
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
    if (recipe.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeService.update(recipe));
    } else {
      this.subscribeToSaveResponse(this.recipeService.create(recipe));
    }
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
      creationDate: this.editForm.get(['creationDate']).value,
      lastEditDate: this.editForm.get(['lastEditDate']).value,
      isVisible: this.editForm.get(['isVisible']).value,
      language: this.editForm.get(['language']).value,
      totalGramsWeight: this.editForm.get(['totalGramsWeight']).value,
      basicNutritionData: this.editForm.get(['basicNutritionData']).value,
      sourceRecipe: this.editForm.get(['sourceRecipe']).value,
      kitchenAppliances: this.editForm.get(['kitchenAppliances']).value,
      dishTypes: this.editForm.get(['dishTypes']).value,
      mealTypes: this.editForm.get(['mealTypes']).value
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
    this.productService.find(productPortion.get('productId').value).subscribe(
      (res: HttpResponse<IProduct>) => productPortion.patchValue({product: res.body}),
      (res: HttpErrorResponse) => productPortion.patchValue({product: null})
    );
  }

  addIngredient(recipeSection: FormGroup) {
    const modalRef = this.modalService.open(ProductComponent, {windowClass: 'custom-modal'});

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: Product) => {
      modalRef.close();

      const productPortionsFormGroup = this.getProductPortionsFormGroup();
      productPortionsFormGroup.patchValue({productId: receivedEntry.id});
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
}
