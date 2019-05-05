import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {IMealPlan} from 'app/shared/model/meal-plan.model';
import {MealPlanService} from './meal-plan.service';
import {IMealPlanDay, MealPlanDay} from 'app/shared/model/meal-plan-day.model';
import {IMeal, Meal} from 'app/shared/model/meal.model';
import {IRecipeSection} from 'app/shared/model/recipe-section.model';
import {ProductComponent, ProductService} from 'app/entities/product';
import {IProduct, Product} from 'app/shared/model/product.model';
import {IProductPortion, ProductPortion} from 'app/shared/model/product-portion.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IMealProduct, MealProduct} from 'app/shared/model/meal-product.model';

@Component({
    selector: 'jhi-meal-plan-update',
    templateUrl: './meal-plan-update.component.html'
})
export class MealPlanUpdateComponent implements OnInit {
    mealPlan: IMealPlan;
    isSaving: boolean;
    creationDateDp: any;

    constructor(
        protected mealPlanService: MealPlanService,
        protected activatedRoute: ActivatedRoute,
        protected modalService: NgbModal,
        protected productService: ProductService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({mealPlan}) => {
            this.mealPlan = mealPlan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.mealPlanService.update(this.mealPlan));
        } else {
            this.subscribeToSaveResponse(this.mealPlanService.create(this.mealPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealPlan>>) {
        result.subscribe((res: HttpResponse<IMealPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    numberOfDaysChanged() {
        if (this.mealPlan.numberOfDays && this.mealPlan.numberOfDays > 0) {
            if (!this.mealPlan.days) {
                this.mealPlan.days = [];
            }
            if (this.mealPlan.numberOfDays !== this.mealPlan.days.length) {
                const temp: IMealPlanDay[] = [];
                for (let i = 0; i < this.mealPlan.numberOfDays; ++i) {
                    if (i < this.mealPlan.days.length) {
                        temp.push(this.mealPlan.days[i]);
                    } else {
                        temp.push(new MealPlanDay(null, i + 1, []));
                    }
                }
                this.mealPlan.days = temp;
                this.numberOfMealsPerDayChanged();
            }
        }
    }

    numberOfMealsPerDayChanged() {
        if (this.mealPlan.numberOfMealsPerDay && this.mealPlan.numberOfMealsPerDay > 0) {
            if (this.mealPlan.numberOfDays) {
                if (!this.mealPlan.days || this.mealPlan.days.length !== this.mealPlan.numberOfDays) {
                    this.numberOfDaysChanged();
                } else {
                    for (const day of this.mealPlan.days) {
                        if (!day.meals) {
                            day.meals = [];
                        }
                        if (day.meals.length !== this.mealPlan.numberOfMealsPerDay) {
                            const temp: IMeal[] = [];
                            for (let i = 0; i < this.mealPlan.numberOfMealsPerDay; ++i) {
                                if (i < day.meals.length) {
                                    temp.push(day.meals[i]);
                                } else {
                                    temp.push(new Meal(null, i + 1, [], []));
                                }
                            }
                            day.meals = temp;
                        }
                    }
                }
            }
        }
    }

    addIngredient(meal: IMeal) {
        const modalRef = this.modalService.open(ProductComponent, {windowClass: 'custom-modal'});

        modalRef.componentInstance.passEntry.subscribe((receivedEntry: Product) => {
            modalRef.close();

            const mealProduct = new MealProduct(null, receivedEntry.id, null, null);
            meal.mealProducts.push(mealProduct);
            this.findProduct(mealProduct);
        });
    }

    findProduct(mealProduct: IMealProduct): void {
        this.productService.find(mealProduct.productId).subscribe(
            (res: HttpResponse<IProduct>) => mealProduct.product = res.body,
            (res: HttpErrorResponse) => mealProduct.product = null
        );
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }
}
