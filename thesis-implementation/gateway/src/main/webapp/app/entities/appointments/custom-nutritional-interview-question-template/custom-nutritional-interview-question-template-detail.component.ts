import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-template-detail',
  templateUrl: './custom-nutritional-interview-question-template-detail.component.html'
})
export class CustomNutritionalInterviewQuestionTemplateDetailComponent implements OnInit {
  customNutritionalInterviewQuestionTemplate: ICustomNutritionalInterviewQuestionTemplate;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customNutritionalInterviewQuestionTemplate }) => {
      this.customNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplate;
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
