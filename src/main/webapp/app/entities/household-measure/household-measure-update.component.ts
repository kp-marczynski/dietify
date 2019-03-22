import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHouseholdMeasure } from 'app/shared/model/household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-household-measure-update',
    templateUrl: './household-measure-update.component.html'
})
export class HouseholdMeasureUpdateComponent implements OnInit {
    householdMeasure: IHouseholdMeasure;
    isSaving: boolean;

    products: IProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected householdMeasureService: HouseholdMeasureService,
        protected productService: ProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ householdMeasure }) => {
            this.householdMeasure = householdMeasure;
        });
        this.productService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProduct[]>) => response.body)
            )
            .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.householdMeasure.id !== undefined) {
            this.subscribeToSaveResponse(this.householdMeasureService.update(this.householdMeasure));
        } else {
            this.subscribeToSaveResponse(this.householdMeasureService.create(this.householdMeasure));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHouseholdMeasure>>) {
        result.subscribe((res: HttpResponse<IHouseholdMeasure>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
}
