import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPreparationStep } from 'app/shared/model/preparation-step.model';
import { PreparationStepService } from './preparation-step.service';
import { IRecipeSection } from 'app/shared/model/recipe-section.model';
import { RecipeSectionService } from 'app/entities/recipe-section';

@Component({
    selector: 'jhi-preparation-step-update',
    templateUrl: './preparation-step-update.component.html'
})
export class PreparationStepUpdateComponent implements OnInit {
    preparationStep: IPreparationStep;
    isSaving: boolean;

    recipesections: IRecipeSection[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected preparationStepService: PreparationStepService,
        protected recipeSectionService: RecipeSectionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ preparationStep }) => {
            this.preparationStep = preparationStep;
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
        if (this.preparationStep.id !== undefined) {
            this.subscribeToSaveResponse(this.preparationStepService.update(this.preparationStep));
        } else {
            this.subscribeToSaveResponse(this.preparationStepService.create(this.preparationStep));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreparationStep>>) {
        result.subscribe((res: HttpResponse<IPreparationStep>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
