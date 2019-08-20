import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {INutritionalInterview} from 'app/shared/model/appointments/nutritional-interview.model';

@Component({
  selector: 'jhi-nutritional-interview-detail',
  templateUrl: './nutritional-interview-detail.component.html'
})
export class NutritionalInterviewDetailComponent implements OnInit {
  @Input() nutritionalInterview: INutritionalInterview;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  showHeader: boolean;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // if (!this.nutritionalInterview) {
    //   this.activatedRoute.data.subscribe(({nutritionalInterview}) => {
    //     this.nutritionalInterview = nutritionalInterview;
    //   });
    //   this.standaloneView = true;
    // } else {
    //   this.standaloneView = false;
    // }
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  previousState() {
    this.cancel.emit(true);
  }
}
