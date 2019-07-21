import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-detail',
  templateUrl: './custom-nutritional-interview-question-detail.component.html'
})
export class CustomNutritionalInterviewQuestionDetailComponent implements OnInit {
  customNutritionalInterviewQuestion: ICustomNutritionalInterviewQuestion;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customNutritionalInterviewQuestion }) => {
      this.customNutritionalInterviewQuestion = customNutritionalInterviewQuestion;
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
