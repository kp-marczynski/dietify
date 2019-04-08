import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from './recipe.service';
import { IKitchenAppliance } from 'app/shared/model/kitchen-appliance.model';
import { KitchenApplianceService } from 'app/entities/kitchen-appliance';
import { IDishType } from 'app/shared/model/dish-type.model';
import { DishTypeService } from 'app/entities/dish-type';
import { IMealType } from 'app/shared/model/meal-type.model';
import { MealTypeService } from 'app/entities/meal-type';

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

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected recipeService: RecipeService,
        protected kitchenApplianceService: KitchenApplianceService,
        protected dishTypeService: DishTypeService,
        protected mealTypeService: MealTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recipe }) => {
            this.recipe = recipe;
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
        if (this.recipe.id !== undefined) {
            this.subscribeToSaveResponse(this.recipeService.update(this.recipe));
        } else {
            this.subscribeToSaveResponse(this.recipeService.create(this.recipe));
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
}
