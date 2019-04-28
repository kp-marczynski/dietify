import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';
import {IRecipe} from 'app/shared/model/recipe.model';
import {RecipeService} from './recipe.service';
import {IKitchenAppliance} from 'app/shared/model/kitchen-appliance.model';
import {KitchenApplianceService} from 'app/entities/kitchen-appliance';
import {IDishType} from 'app/shared/model/dish-type.model';
import {DishTypeService} from 'app/entities/dish-type';
import {IMealType} from 'app/shared/model/meal-type.model';
import {MealTypeService} from 'app/entities/meal-type';
import {RecipeSection} from 'app/shared/model/recipe-section.model';
import {IProductPortion, ProductPortion} from 'app/shared/model/product-portion.model';
import {PreparationStep} from 'app/shared/model/preparation-step.model';
import {ProductService} from 'app/entities/product';
import {IProduct} from 'app/shared/model/product.model';
import {ILanguage} from 'app/shared/model/language.model';
import {LanguageService} from 'app/entities/language';

@Component({
    selector: 'jhi-recipe-update',
    templateUrl: './recipe-update.component.html'
})
export class RecipeUpdateComponent implements OnInit {
    recipe: IRecipe;
    isSaving: boolean;

    recipes: IRecipe[];

    kitchenappliances: IKitchenAppliance[];

    dishtypes: IDishType[];

    mealtypes: IMealType[];
    creationDateDp: any;
    lastEditDateDp: any;

    languages: ILanguage[] = [];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected recipeService: RecipeService,
        protected kitchenApplianceService: KitchenApplianceService,
        protected dishTypeService: DishTypeService,
        protected mealTypeService: MealTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected productService: ProductService,
        protected languageService: LanguageService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.languageService
            .query()
            .pipe(
                filter((res: HttpResponse<ILanguage[]>) => res.ok),
                map((res: HttpResponse<ILanguage[]>) => res.body)
            )
            .subscribe(
                (res: ILanguage[]) => {
                    this.languages = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.activatedRoute.data.subscribe(({recipe}) => {
            this.recipe = recipe;
            if (!this.recipe.recipeSections) {
                this.recipe.recipeSections = [];
            }
            if (this.recipe.recipeSections.length === 0) {
                this.recipe.recipeSections.push(new RecipeSection(null, null, null, null));
            }
            this.recipe.recipeSections.forEach(recipeSection => {
                if (!recipeSection.productPortions) {
                    recipeSection.productPortions = [];
                }
                if (recipeSection.productPortions.length === 0) {
                    recipeSection.productPortions.push(new ProductPortion(null, null, null, null));
                }
                if (!recipeSection.preparationSteps) {
                    recipeSection.preparationSteps = [];
                }
                if (recipeSection.preparationSteps.length === 0) {
                    recipeSection.preparationSteps.push(new PreparationStep(null, null, null));
                } else {
                    recipeSection.preparationSteps.sort((a, b) => (a.ordinalNumber - b.ordinalNumber));
                }
            });
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
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.recipe, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.removeEmpty();
        this.updatePreparationStepsOrdinalNumbers();
        if (this.recipe.id !== undefined) {
            this.subscribeToSaveResponse(this.recipeService.update(this.recipe));
        } else {
            this.subscribeToSaveResponse(this.recipeService.create(this.recipe));
        }
    }

    removeEmpty() {
        for (const section of this.recipe.recipeSections) {
            section.preparationSteps = section.preparationSteps.filter(preparationStep => (preparationStep.stepDescription && preparationStep.stepDescription !== ''));
            section.productPortions = section.productPortions.filter(productPortion => (productPortion.productId));
        }
    }

    updatePreparationStepsOrdinalNumbers() {
        for (const section of this.recipe.recipeSections) {
            for (let i = 0; i < section.preparationSteps.length; i++) {
                section.preparationSteps[i].ordinalNumber = i + 1;
            }
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipe>>) {
        result.subscribe((res: HttpResponse<IRecipe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    createNewPreparationStep(isLast: boolean) {
        if (isLast) {
            this.recipe.recipeSections[0].preparationSteps.push(new PreparationStep(null, null, null));
        }
        // console.log(this.recipe.recipeSections[0].preparationSteps);
        if (this.recipe.recipeSections[0].preparationSteps.filter(preparationStep => (!preparationStep.stepDescription || preparationStep.stepDescription.trim() === '')).length > 1) {
            this.recipe.recipeSections[0].preparationSteps = this.recipe.recipeSections[0].preparationSteps.filter(preparationStep => (preparationStep.stepDescription && preparationStep.stepDescription.trim() !== ''));
            this.recipe.recipeSections[0].preparationSteps.push(new PreparationStep(null, null, null));
            console.log(this.recipe.recipeSections[0].preparationSteps);
        }
    }

    createNewProductPortion(isLast: boolean) {
        if (isLast) {
            this.recipe.recipeSections[0].productPortions.push(new ProductPortion(null, null, null, null));
        }
        if (this.recipe.recipeSections[0].productPortions.filter(productPortion => (!productPortion.productId)).length > 1) {
            this.recipe.recipeSections[0].productPortions = this.recipe.recipeSections[0].productPortions.filter(productPortion => (productPortion.productId));
            this.recipe.recipeSections[0].productPortions.push(new ProductPortion(null, null, null, null));
        }
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    findProduct(productPortion: IProductPortion) {
        return this.productService.find(productPortion.productId).subscribe((res: HttpResponse<IProduct>) => productPortion.product = res.body, (res: HttpErrorResponse) => productPortion.product = null);
    }
}
