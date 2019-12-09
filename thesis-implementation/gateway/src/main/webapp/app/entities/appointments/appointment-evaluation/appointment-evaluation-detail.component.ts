import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';

@Component({
  selector: 'jhi-appointment-evaluation-detail',
  templateUrl: './appointment-evaluation-detail.component.html'
})
export class AppointmentEvaluationDetailComponent implements OnInit {
  appointmentEvaluation: IAppointmentEvaluation;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appointmentEvaluation }) => {
      this.appointmentEvaluation = appointmentEvaluation;
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
