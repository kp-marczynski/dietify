import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPreparationStep } from 'app/shared/model/recipes/preparation-step.model';

@Component({
  selector: 'jhi-preparation-step-detail',
  templateUrl: './preparation-step-detail.component.html'
})
export class PreparationStepDetailComponent implements OnInit {
  preparationStep: IPreparationStep;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ preparationStep }) => {
      this.preparationStep = preparationStep;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
