import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService} from 'ng-jhipster';
import {IProduct} from 'app/shared/model/product.model';
import {ProductService} from './product.service';
import {ILanguage} from 'app/shared/model/language.model';
import {LanguageService} from 'app/entities/language';
import {IProductSubcategory, ProductSubcategory} from 'app/shared/model/product-subcategory.model';
import {ProductSubcategoryService} from 'app/entities/product-subcategory';
import {IDietType} from 'app/shared/model/diet-type.model';
import {DietTypeService} from 'app/entities/diet-type';
import {NutritionDefinitionService} from 'app/entities/nutrition-definition';
import {INutritionDefinition} from 'app/shared/model/nutrition-definition.model';
import {NutritionData} from 'app/shared/model/nutrition-data.model';
import {HouseholdMeasure} from 'app/shared/model/household-measure.model';
import {IProductCategory} from 'app/shared/model/product-category.model';
import {ProductCategoryService} from 'app/entities/product-category';

@Component({
    selector: 'jhi-product-update',
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
    product: IProduct;
    isSaving: boolean;

    languages: ILanguage[];

    productSubcategories: IProductSubcategory[];

    productCategories: IProductCategory[];

    selectedCategory: IProductCategory;

    nutritionDefinitions: INutritionDefinition[];

    newSubcategory = '';

    diettypes: IDietType[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productService: ProductService,
        protected languageService: LanguageService,
        protected productSubcategoryService: ProductSubcategoryService,
        protected productCategoryService: ProductCategoryService,
        protected dietTypeService: DietTypeService,
        protected activatedRoute: ActivatedRoute,
        protected nutritionDefinitionService: NutritionDefinitionService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({product}) => {
            this.product = product;
            if (this.product.subcategory) {
                this.selectedCategory = this.product.subcategory.category;
                this.fetchSubcategories();
            }

            if (!this.product.householdMeasures) {
                this.product.householdMeasures = [];
            }
            this.product.householdMeasures.push(new HouseholdMeasure(null, null, null, null));
            this.nutritionDefinitionService
                .query()
                .pipe(
                    filter((res: HttpResponse<INutritionDefinition[]>) => res.ok),
                    map((res: HttpResponse<INutritionDefinition[]>) => res.body)
                )
                .subscribe(
                    (res: INutritionDefinition[]) => {
                        this.nutritionDefinitions = res;
                        if (!this.product.nutritionData) {
                            this.product.nutritionData = [];
                        }
                        for (const nutritionDefinition of this.nutritionDefinitions) {
                            if (!this.product.nutritionData.find(data => (data.nutritionDefinition.tagname === nutritionDefinition.tagname))) {
                                this.product.nutritionData.push(new NutritionData(null, null, nutritionDefinition));
                            }
                        }
                        this.product.nutritionData.sort((a, b) => (a.nutritionDefinition.tagname.localeCompare(b.nutritionDefinition.tagname)));
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        });
        this.languageService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILanguage[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILanguage[]>) => response.body)
            )
            .subscribe((res: ILanguage[]) => (this.languages = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.productCategoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductCategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductCategory[]>) => response.body)
            )
            .subscribe(
                (res: IProductCategory[]) => (this.productCategories = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.dietTypeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDietType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDietType[]>) => response.body)
            )
            .subscribe((res: IDietType[]) => (this.diettypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.product.nutritionData) {
            this.product.nutritionData = this.product.nutritionData.filter(data => (data.nutritionValue !== null));
        }
        if (this.product.householdMeasures) {
            this.product.householdMeasures = this.product.householdMeasures.filter(measure => (measure.description || measure.gramsWeight));
        }
        if (this.newSubcategory && this.newSubcategory !== '') {
            this.productSubcategoryService.create(new ProductSubcategory(null, this.newSubcategory, this.selectedCategory)).subscribe(
                (res: HttpResponse<IProductSubcategory>) => {
                    this.product.subcategory = res.body;
                    this.processSave();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.processSave();
        }
    }

    processSave() {
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
        result.subscribe((res: HttpResponse<IProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLanguageById(index: number, item: ILanguage) {
        return item.id;
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

    createNewHouseholdMeasure(isLast: boolean) {
        if (isLast) {
            this.product.householdMeasures.push(new HouseholdMeasure(null, null, null, null));
        }
        if (this.product.householdMeasures.filter(measure => ((!measure.description || measure.description === '') && (!measure.gramsWeight || measure.gramsWeight === 0))).length > 1) {
            this.product.householdMeasures = this.product.householdMeasures.filter(measure => (measure.description || measure.gramsWeight));
            this.product.householdMeasures.push(new HouseholdMeasure(null, null, null, null));
        }
    }

    fetchSubcategories() {
        this.product.subcategory = null;
        if (this.selectedCategory) {

            document.getElementById('field_subcategory').removeAttribute('disabled');
            document.getElementById('new-subcategory').removeAttribute('disabled');
            this.productSubcategoryService
                .query({
                    productCategoryId: this.selectedCategory.id,
                    languageId: this.product.language.id
                })
                .pipe(
                    filter((mayBeOk: HttpResponse<IProductSubcategory[]>) => mayBeOk.ok),
                    map((response: HttpResponse<IProductSubcategory[]>) => response.body)
                )
                .subscribe(
                    (res: IProductSubcategory[]) => (this.productSubcategories = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    selectedNewSubcategory() {
        this.product.subcategory = null;
    }

    selectedExistingSubcategory() {
        if (this.product.subcategory) {
            this.newSubcategory = '';
        }
    }
}
