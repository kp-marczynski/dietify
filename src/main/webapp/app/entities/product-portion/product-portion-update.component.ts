import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductPortion } from 'app/shared/model/product-portion.model';
import { ProductPortionService } from './product-portion.service';
import { IRecipeSection } from 'app/shared/model/recipe-section.model';
import { RecipeSectionService } from 'app/entities/recipe-section';

@Component({
    selector: 'jhi-product-portion-update',
    templateUrl: './product-portion-update.component.html'
})
export class ProductPortionUpdateComponent implements OnInit {
    productPortion: IProductPortion;
    isSaving: boolean;

    recipesections: IRecipeSection[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productPortionService: ProductPortionService,
        protected recipeSectionService: RecipeSectionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productPortion }) => {
            this.productPortion = productPortion;
        });
        this.recipeSectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRecipeSection[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRecipeSection[]>) => response.body)
            )
            .subscribe((res: IRecipeSection[]) => (this.recipesections = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productPortion.id !== undefined) {
            this.subscribeToSaveResponse(this.productPortionService.update(this.productPortion));
        } else {
            this.subscribeToSaveResponse(this.productPortionService.create(this.productPortion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductPortion>>) {
        result.subscribe((res: HttpResponse<IProductPortion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRecipeSectionById(index: number, item: IRecipeSection) {
        return item.id;
    }
}
