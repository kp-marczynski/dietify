import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';
import { AccountService } from 'app/core';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';

@Component({
  selector: 'jhi-custom-nutritional-interview-question',
  templateUrl: './custom-nutritional-interview-question.component.html'
})
export class CustomNutritionalInterviewQuestionComponent implements OnInit, OnDestroy {
  customNutritionalInterviewQuestions: ICustomNutritionalInterviewQuestion[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected customNutritionalInterviewQuestionService: CustomNutritionalInterviewQuestionService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.customNutritionalInterviewQuestionService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ICustomNutritionalInterviewQuestion[]>) => res.ok),
          map((res: HttpResponse<ICustomNutritionalInterviewQuestion[]>) => res.body)
        )
        .subscribe(
          (res: ICustomNutritionalInterviewQuestion[]) => (this.customNutritionalInterviewQuestions = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.customNutritionalInterviewQuestionService
      .query()
      .pipe(
        filter((res: HttpResponse<ICustomNutritionalInterviewQuestion[]>) => res.ok),
        map((res: HttpResponse<ICustomNutritionalInterviewQuestion[]>) => res.body)
      )
      .subscribe(
        (res: ICustomNutritionalInterviewQuestion[]) => {
          this.customNutritionalInterviewQuestions = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCustomNutritionalInterviewQuestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomNutritionalInterviewQuestion) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInCustomNutritionalInterviewQuestions() {
    this.eventSubscriber = this.eventManager.subscribe('customNutritionalInterviewQuestionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
