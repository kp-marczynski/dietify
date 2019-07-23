import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

@Component({
  selector: 'jhi-nutritional-interview-detail',
  templateUrl: './nutritional-interview-detail.component.html'
})
export class NutritionalInterviewDetailComponent implements OnInit {
  nutritionalInterview: INutritionalInterview;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nutritionalInterview }) => {
      this.nutritionalInterview = nutritionalInterview;
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
