import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPreparationStep } from 'app/shared/model/preparation-step.model';

@Component({
    selector: 'jhi-preparation-step-detail',
    templateUrl: './preparation-step-detail.component.html'
})
export class PreparationStepDetailComponent implements OnInit {
    preparationStep: IPreparationStep;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preparationStep }) => {
            this.preparationStep = preparationStep;
        });
    }

    previousState() {
        window.history.back();
    }
}
