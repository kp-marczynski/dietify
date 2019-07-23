import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

@Component({
  selector: 'jhi-body-measurement-detail',
  templateUrl: './body-measurement-detail.component.html'
})
export class BodyMeasurementDetailComponent implements OnInit {
  bodyMeasurement: IBodyMeasurement;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bodyMeasurement }) => {
      this.bodyMeasurement = bodyMeasurement;
    });
  }

  previousState() {
    window.history.back();
  }
}
