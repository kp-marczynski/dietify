import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/products/product.model';
import { ProductService } from './product.service';
import { IProductBasicNutritionData, ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';
import { IProductSubcategory, ProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { ProductSubcategoryService } from 'app/entities/products/product-subcategory';
import { IDietType } from 'app/shared/model/products/diet-type.model';
import { DietTypeService } from 'app/entities/products/diet-type';
import { NutritionDefinitionService } from 'app/entities/products/nutrition-definition';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';
import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';
import { Account, AccountService, JhiLanguageHelper, UserService } from 'app/core';
import { IProductCategory } from 'app/shared/model/products/product-category.model';
import { ProductCategoryService } from 'app/entities/products/product-category';
import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

const HouseholdMeasureValidator: ValidatorFn = (fg: FormGroup) => {
  const description = fg.get('description').value;
  const gramsWeight = fg.get('gramsWeight').value;
  return (description && gramsWeight) || (!description && !gramsWeight) ? null : { required: true };
};

const ProductSubcategoryValidator: ValidatorFn = (fg: FormGroup) => {
  const subcategory = fg.get('subcategory').value;
  const newSubcategory = fg.get('newSubcategory').value;
  return subcategory || (newSubcategory && newSubcategory.trim().length > 0) ? null : { required: true };
};

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  basicnutritiondata: IProductBasicNutritionData[];

  productsubcategories: IProductSubcategory[];

  diettypes: IDietType[];

  languages: any[];
  lang = 'en';

  productCategories: IProductCategory[];

  newSubcategory = '';

  editForm = this.fb.group(
    {
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
      category: [null, [Validators.required]],
      subcategory: [],
      newSubcategory: [],
      suitableDiets: [],
      unsuitableDiets: [],
      nutritionData: this.fb.array([]),
      householdMeasures: this.fb.array([this.getHouseholdMeasuresFormGroup()])
    },
    { validator: ProductSubcategoryValidator }
  );

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected productSubcategoryService: ProductSubcategoryService,
    protected productCategoryService: ProductCategoryService,
    protected dietTypeService: DietTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nutritionDefinitionService: NutritionDefinitionService,
    private accountService: AccountService,
    private userService: UserService,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      if (!product.basicNutritionData) {
        product.basicNutritionData = new ProductBasicNutritionData();
      }
      this.updateForm(product);
      if (!product || !product.id) {
        this.accountService.identity().then((account: Account) => {
          this.userService.find(account.login).subscribe(res => {
            this.editForm.patchValue({ authorId: res.body.id });
          });
        });
      }
      this.getHouseholdMeasuresFormArray().push(this.getHouseholdMeasuresFormGroup());

      this.nutritionDefinitionService
        .query({
          excludeBasicNutritions: true
        })
        .pipe(
          filter((res: HttpResponse<INutritionDefinition[]>) => res.ok),
          map((res: HttpResponse<INutritionDefinition[]>) => res.body)
        )
        .subscribe(
          (res: INutritionDefinition[]) => {
            for (const nutritionDefinition of res) {
              if (
                this.getNutritionDataFormArray().controls.length === 0 ||
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
    // this.productSubcategoryService
    //   .query()
    //   .pipe(
    //     filter((mayBeOk: HttpResponse<IProductSubcategory[]>) => mayBeOk.ok),
    //     map((response: HttpResponse<IProductSubcategory[]>) => response.body)
    //   )
    //   .subscribe((res: IProductSubcategory[]) => (this.productsubcategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dietTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDietType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDietType[]>) => response.body)
      )
      .subscribe((res: IDietType[]) => (this.diettypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productCategoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductCategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductCategory[]>) => response.body)
      )
      .subscribe((res: IProductCategory[]) => (this.productCategories = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
    this.languageService.getCurrent().then(res => this.changeLanguage(res));
    this.languageHelper.language.subscribe((languageKey: string) => this.changeLanguage(languageKey));

    this.editForm.get('language').valueChanges.subscribe((lang: string) => {
      if (lang.length === 2) {
        this.fetchSubcategories();
      }
    });
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

  getHouseholdMeasuresFormArray(): FormArray {
    return this.editForm.get('householdMeasures') as FormArray;
  }

  getHouseholdMeasuresFormGroup() {
    return this.fb.group(
      {
        id: [],
        description: [null, [Validators.minLength(1), Validators.maxLength(255)]],
        gramsWeight: [null, [Validators.min(0)]],
        isVisible: [false, [Validators.required]]
      },
      { validator: HouseholdMeasureValidator }
    );
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
      unsuitableDiets: product.unsuitableDiets
    });
    if (product.nutritionData) {
      for (let nutritionDataIndex = 0; nutritionDataIndex < product.nutritionData.length; ++nutritionDataIndex) {
        this.getNutritionDataFormArray().push(this.getNutritionDataFormGroup());
      }
      this.getNutritionDataFormArray().patchValue(product.nutritionData);
    }
    if (product.householdMeasures) {
      for (let householdMeasuresIndex = 0; householdMeasuresIndex < product.householdMeasures.length; ++householdMeasuresIndex) {
        this.getHouseholdMeasuresFormArray().push(this.getHouseholdMeasuresFormGroup());
      }
      this.getHouseholdMeasuresFormArray().patchValue(product.householdMeasures);
    }
    if (product.subcategory) {
      this.editForm.patchValue({ category: product.subcategory.category });
      this.fetchSubcategories();
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (!product.subcategory && this.editForm.get('newSubcategory').value && this.editForm.get('newSubcategory').value.trim().length > 0) {
      product.subcategory = new ProductSubcategory(null, this.editForm.get('newSubcategory').value, this.editForm.get('category').value);
    }

    this.removeEmptyNutritionData(product);
    this.removeEmptyHouseholdMeasures(product);

    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private removeEmptyNutritionData(product: IProduct) {
    product.nutritionData = product.nutritionData.filter(data => !isNaN(data.nutritionValue) && data.nutritionValue !== null);
  }

  private removeEmptyHouseholdMeasures(product: IProduct) {
    product.householdMeasures = product.householdMeasures.filter(measure => measure.description && measure.gramsWeight);
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

  trackProductSubcategoryById(index: number, item: IProductSubcategory) {
    return item.id;
  }

  trackProductCategoryById(index: number, item: IProductCategory) {
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

  getProductCategoryTranslation(productCategory: IProductCategory): string {
    const productCategoryTranslation: IProductCategoryTranslation = productCategory.translations.find(
      translation => translation.language === this.lang
    );
    return productCategoryTranslation ? productCategoryTranslation.translation : productCategory.description;
  }

  changeLanguage(newLang: string) {
    if (newLang !== undefined && newLang !== this.lang) {
      this.lang = newLang;
      this.reloadTranslations();
    }
  }

  private reloadTranslations() {
    this.getNutritionDataFormArray().patchValue(this.getNutritionDataFormArray().value);
    this.productCategories = [...this.productCategories];
  }

  updateHouseholdMeasureList() {
    for (let i = this.getHouseholdMeasuresFormArray().length - 1; i >= 0; --i) {
      if (
        !this.getHouseholdMeasuresFormArray().controls[i].get('description').value &&
        !this.getHouseholdMeasuresFormArray().controls[i].get('gramsWeight').value
      ) {
        this.getHouseholdMeasuresFormArray().removeAt(i);
      }
    }
    this.getHouseholdMeasuresFormArray().push(this.getHouseholdMeasuresFormGroup());
  }

  fetchSubcategories() {
    if (this.editForm.get('subcategory').value && this.editForm.get('subcategory').value.category !== this.editForm.get('category').value) {
      this.editForm.get('subcategory').setValue(null);
    }
    if (this.editForm.get('category').value) {
      document.getElementById('field_subcategory').removeAttribute('disabled');
      document.getElementById('new_subcategory').removeAttribute('disabled');
      this.productSubcategoryService
        .query({
          productCategoryId: this.editForm.get('category').value.id,
          language: this.editForm.get('language').value
        })
        .pipe(
          filter((mayBeOk: HttpResponse<IProductSubcategory[]>) => mayBeOk.ok),
          map((response: HttpResponse<IProductSubcategory[]>) => response.body)
        )
        .subscribe(
          (res: IProductSubcategory[]) => (this.productsubcategories = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  selectedNewSubcategory() {
    this.editForm.get('subcategory').setValue(null);
  }

  selectedExistingSubcategory() {
    if (this.editForm.get('subcategory').value) {
      this.editForm.get('newSubcategory').setValue(null);
    }
  }

  removeHouseholdMeasure(index: number) {
    this.getHouseholdMeasuresFormArray().removeAt(index);
  }
}
