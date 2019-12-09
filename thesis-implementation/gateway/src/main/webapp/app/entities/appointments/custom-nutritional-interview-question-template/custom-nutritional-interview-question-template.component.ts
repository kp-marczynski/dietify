import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';
import { AccountService } from 'app/core';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-template',
  templateUrl: './custom-nutritional-interview-question-template.component.html'
})
export class CustomNutritionalInterviewQuestionTemplateComponent implements OnInit, OnDestroy {
  customNutritionalInterviewQuestionTemplates: ICustomNutritionalInterviewQuestionTemplate[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected customNutritionalInterviewQuestionTemplateService: CustomNutritionalInterviewQuestionTemplateService,
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
      this.customNutritionalInterviewQuestionTemplateService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ICustomNutritionalInterviewQuestionTemplate[]>) => res.ok),
          map((res: HttpResponse<ICustomNutritionalInterviewQuestionTemplate[]>) => res.body)
        )
        .subscribe(
          (res: ICustomNutritionalInterviewQuestionTemplate[]) => (this.customNutritionalInterviewQuestionTemplates = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.customNutritionalInterviewQuestionTemplateService
      .query()
      .pipe(
        filter((res: HttpResponse<ICustomNutritionalInterviewQuestionTemplate[]>) => res.ok),
        map((res: HttpResponse<ICustomNutritionalInterviewQuestionTemplate[]>) => res.body)
      )
      .subscribe(
        (res: ICustomNutritionalInterviewQuestionTemplate[]) => {
          this.customNutritionalInterviewQuestionTemplates = res;
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
    this.registerChangeInCustomNutritionalInterviewQuestionTemplates();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICustomNutritionalInterviewQuestionTemplate) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInCustomNutritionalInterviewQuestionTemplates() {
    this.eventSubscriber = this.eventManager.subscribe('customNutritionalInterviewQuestionTemplateListModification', response =>
      this.loadAll()
    );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
