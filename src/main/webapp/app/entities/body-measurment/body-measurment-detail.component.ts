import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';

@Component({
    selector: 'jhi-body-measurment-detail',
    templateUrl: './body-measurment-detail.component.html'
})
export class BodyMeasurmentDetailComponent implements OnInit {
    bodyMeasurment: IBodyMeasurment;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bodyMeasurment }) => {
            this.bodyMeasurment = bodyMeasurment;
        });
    }

    previousState() {
        window.history.back();
    }
}
