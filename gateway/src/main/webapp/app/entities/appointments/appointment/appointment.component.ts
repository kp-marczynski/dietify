import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAppointment } from 'app/shared/model/appointments/appointment.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'jhi-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  @Input() isWaitingForConsultation: boolean;
  @Input() patientId: number;

  currentAccount: any;
  appointments: IAppointment[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  currentSearch: string;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  standaloneView: boolean;

  constructor(
    protected appointmentService: AppointmentService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      if (data.pagingParams) {
        this.standaloneView = true;
        this.page = data.pagingParams.page;
        this.previousPage = data.pagingParams.page;
        this.reverse = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
      } else {
        this.standaloneView = false;
        this.page = 1;
        this.previousPage = 1;
        this.reverse = false;
        this.predicate = 'appointmentDate';
      }
    });
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.patientId) {
      if (this.currentSearch) {
        this.appointmentService
          .search({
            page: this.page - 1,
            query: this.currentSearch,
            size: this.itemsPerPage,
            sort: this.sort(),
            isWaitingForConsultation: this.isWaitingForConsultation,
            patientId: this.patientId
          })
          .subscribe(
            (res: HttpResponse<IAppointment[]>) => this.paginateAppointments(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
        return;
      }
      this.appointmentService
        .query({
          page: this.page - 1,
          size: this.itemsPerPage,
          sort: this.sort(),
          isWaitingForConsultation: this.isWaitingForConsultation,
          patientId: this.patientId
        })
        .subscribe(
          (res: HttpResponse<IAppointment[]>) => this.paginateAppointments(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      if (this.currentSearch) {
        this.appointmentService
          .search({
            page: this.page - 1,
            query: this.currentSearch,
            size: this.itemsPerPage,
            sort: this.sort(),
            isWaitingForConsultation: this.isWaitingForConsultation
          })
          .subscribe(
            (res: HttpResponse<IAppointment[]>) => this.paginateAppointments(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
        return;
      }
      this.appointmentService
        .query({
          page: this.page - 1,
          size: this.itemsPerPage,
          sort: this.sort(),
          isWaitingForConsultation: this.isWaitingForConsultation
        })
        .subscribe(
          (res: HttpResponse<IAppointment[]>) => this.paginateAppointments(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    if (this.standaloneView) {
      this.router.navigate(['/appointment'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          search: this.currentSearch,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
      });
    }
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.currentSearch = '';
    if (this.standaloneView) {
      this.router.navigate([
        '/appointment',
        {
          page: this.page,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
      ]);
    }
    this.loadAll();
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.page = 0;
    this.currentSearch = query;
    if (this.standaloneView) {
      this.router.navigate([
        '/appointment',
        {
          search: this.currentSearch,
          page: this.page,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
      ]);
    }
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAppointments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAppointment) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInAppointments() {
    this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAppointments(data: IAppointment[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.appointments = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
