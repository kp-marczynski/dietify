import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

@Component({
  selector: 'jhi-body-measurement-detail',
  templateUrl: './body-measurement-detail.component.html'
})
export class BodyMeasurementDetailComponent implements OnInit {
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  bodyMeasurement: IBodyMeasurement;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this.activatedRoute.data.subscribe(({ bodyMeasurement }) => {
    //   this.bodyMeasurement = bodyMeasurement;
    // });
  }

  previousState() {
    this.cancel.emit(true);
  }
}
