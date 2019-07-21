import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatientCard } from 'app/shared/model/patient-card.model';

@Component({
    selector: 'jhi-patient-card-detail',
    templateUrl: './patient-card-detail.component.html'
})
export class PatientCardDetailComponent implements OnInit {
    patientCard: IPatientCard;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ patientCard }) => {
            this.patientCard = patientCard;
        });
    }

    previousState() {
        window.history.back();
    }
}
