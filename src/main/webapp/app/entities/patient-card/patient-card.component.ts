import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IPatientCard } from 'app/shared/model/patient-card.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PatientCardService } from './patient-card.service';
import { Appointment, AppointmentState, IAppointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from 'app/entities/appointment';

@Component({
    selector: 'jhi-patient-card',
    templateUrl: './patient-card.component.html'
})
export class PatientCardComponent implements OnInit, OnDestroy {
    currentAccount: any;
    patientCards: IPatientCard[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    appointmentsLinks: any;
    totalAppointmentsItems: any;
    appointments: IAppointment[];
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    searchPhrase: string;

    constructor(
        protected patientCardService: PatientCardService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected appointmentService: AppointmentService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.appointmentService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAppointment[]>) => this.paginateAppointments(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadAll() {
        this.patientCardService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPatientCard[]>) => this.paginatePatientCards(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/patient-card'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/patient-card',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPatientCards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPatientCard) {
        return item.id;
    }

    registerChangeInPatientCards() {
        this.eventSubscriber = this.eventManager.subscribe('patientCardListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePatientCards(data: IPatientCard[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.patientCards = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    search() {
        //    todo
    }

    protected paginateAppointments(data: IAppointment[], headers: HttpHeaders) {
        this.appointmentsLinks = this.parseLinks.parse(headers.get('link'));
        this.totalAppointmentsItems = parseInt(headers.get('X-Total-Count'), 10);
        this.appointments = data;
    }

    getAwaitingConsultations(): Appointment[] {
        return this.appointments.filter(appointment => appointment.appointmentState === AppointmentState.PLANNED);
    }
}
