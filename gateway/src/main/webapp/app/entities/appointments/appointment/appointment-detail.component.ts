import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {IAppointment} from 'app/shared/model/appointments/appointment.model';
import {MainLayoutCardService} from 'app/layouts/main/main-layout-card.service';

@Component({
  selector: 'jhi-appointment-detail',
  templateUrl: './appointment-detail.component.html'
})
export class AppointmentDetailComponent implements OnInit {
  appointment: IAppointment;

  constructor(protected dataUtils: JhiDataUtils,
              protected activatedRoute: ActivatedRoute,
              protected layoutCardService: MainLayoutCardService) {
  }

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({appointment}) => {
      this.appointment = appointment;
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
