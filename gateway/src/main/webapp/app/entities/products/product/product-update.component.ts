import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/products/product.model';
import { ProductService } from './product.service';
import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { ProductSubcategoryService } from 'app/entities/products/product-subcategory';
import { IDietType } from 'app/shared/model/products/diet-type.model';
import { DietTypeService } from 'app/entities/products/diet-type';
import { NutritionDefinitionService } from 'app/entities/products/nutrition-definition';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { JhiLanguageHelper } from 'app/core';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  basicnutritiondata: IProductBasicNutritionData[];

  productsubcategories: IProductSubcategory[];

  diettypes: IDietType[];

  lang = 'en';

  editForm = this.fb.group({
    id: [],
    source: [null, [Validators.minLength(1), Validators.maxLength(255)]],
    authorId: [],
    description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    isFinal: [null, [Validators.required]],
    isVerified: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    basicNutritionData: this.fb.group({
      id: [],
      energy: [null, [Validators.required]],
      protein: [null, [Validators.required]],
      fat: [null, [Validators.required]],
      carbohydrates: [null, [Validators.required]]
    }),
    subcategory: [null, Validators.required],
    suitableDiets: [],
    unsuitableDiets: [],
    nutritionData: this.fb.array([]),
    householdMeasures: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected productSubcategoryService: ProductSubcategoryService,
    protected dietTypeService: DietTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nutritionDefinitionService: NutritionDefinitionService,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      for (let nutritionDataIndex = 0; nutritionDataIndex < product.nutritionData.length; ++nutritionDataIndex) {
        this.getNutritionDataFormArray().push(this.getNutritionDataFormGroup());
      }
      this.updateForm(product);

      this.nutritionDefinitionService
        .query()
        .pipe(
          filter((res: HttpResponse<INutritionDefinition[]>) => res.ok),
          map((res: HttpResponse<INutritionDefinition[]>) => res.body)
        )
        .subscribe(
          (res: INutritionDefinition[]) => {
            for (const nutritionDefinition of res) {
              if (
                !this.getNutritionDataFormArray().controls.find(
                  nutritionData => nutritionData.value.nutritionDefinition.tag === nutritionDefinition.tag
                )
              ) {
                const nutritionDataFormGroup = this.getNutritionDataFormGroup();
                nutritionDataFormGroup.patchValue({ nutritionDefinition });
                this.getNutritionDataFormArray().push(nutritionDataFormGroup);
              }
            }
            const nutritionDataArray = this.getNutritionDataFormArray().value;
            nutritionDataArray.sort((a, b) => a.nutritionDefinition.tag.localeCompare(b.nutritionDefinition.tag));
            this.getNutritionDataFormArray().patchValue(nutritionDataArray);
          },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    });
    this.productSubcategoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductSubcategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductSubcategory[]>) => response.body)
      )
      .subscribe((res: IProductSubcategory[]) => (this.productsubcategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dietTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDietType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDietType[]>) => response.body)
      )
      .subscribe((res: IDietType[]) => (this.diettypes = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.languageService.getCurrent().then(res => this.changeLanguage(res));
    this.languageHelper.language.subscribe((languageKey: string) => this.changeLanguage(languageKey));
  }

  getNutritionDataFormGroup() {
    return this.fb.group({
      id: [],
      nutritionValue: [null, [Validators.min(0)]],
      nutritionDefinition: []
    });
  }

  getNutritionDataFormArray(): FormArray {
    return this.editForm.get('nutritionData') as FormArray;
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      source: product.source,
      authorId: product.authorId,
      description: product.description,
      isFinal: product.isFinal,
      isVerified: product.isVerified,
      language: product.language,
      basicNutritionData: product.basicNutritionData,
      subcategory: product.subcategory,
      suitableDiets: product.suitableDiets,
      unsuitableDiets: product.unsuitableDiets,
      householdMeasures: product.householdMeasures
    });
    if (product.nutritionData) {
      this.getNutritionDataFormArray().patchValue(product.nutritionData);
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();

    this.removeEmptyNutritionData(product);
    console.log(product);
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private removeEmptyNutritionData(product: IProduct) {
    product.nutritionData = product.nutritionData.filter(data => !isNaN(data.nutritionValue) && data.nutritionValue !== null);
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      source: this.editForm.get(['source']).value,
      authorId: this.editForm.get(['authorId']).value,
      description: this.editForm.get(['description']).value,
      isFinal: this.editForm.get(['isFinal']).value,
      isVerified: this.editForm.get(['isVerified']).value,
      language: this.editForm.get(['language']).value,
      basicNutritionData: this.editForm.get(['basicNutritionData']).value,
      subcategory: this.editForm.get(['subcategory']).value,
      suitableDiets: this.editForm.get(['suitableDiets']).value,
      unsuitableDiets: this.editForm.get(['unsuitableDiets']).value,
      nutritionData: this.editForm.get(['nutritionData']).value,
      householdMeasures: this.editForm.get(['householdMeasures']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
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

  trackProductBasicNutritionDataById(index: number, item: IProductBasicNutritionData) {
    return item.id;
  }

  trackProductSubcategoryById(index: number, item: IProductSubcategory) {
    return item.id;
  }

  trackDietTypeById(index: number, item: IDietType) {
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

  getNutritionDefinitionTranslation(nutritionDefinition: INutritionDefinition): string {
    const nutritionDefinitionTranslation: INutritionDefinitionTranslation = nutritionDefinition.translations.find(
      translation => translation.language === this.lang
    );
    return nutritionDefinitionTranslation ? nutritionDefinitionTranslation.translation : nutritionDefinition.description;
  }

  changeLanguage(newLang: string) {
    if (newLang !== undefined && newLang !== this.lang) {
      this.lang = newLang;
      this.reloadTranslations();
    }
  }

  private reloadTranslations() {
    this.getNutritionDataFormArray().patchValue(this.getNutritionDataFormArray().value);
  }
}
