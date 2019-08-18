import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IPatientCard} from 'app/shared/model/appointments/patient-card.model';
import {MainLayoutCardService} from 'app/layouts/main/main-layout-card.service';

@Component({
  selector: 'jhi-patient-card-detail',
  templateUrl: './patient-card-detail.component.html'
})
export class PatientCardDetailComponent implements OnInit {
  patientCard: IPatientCard;

  constructor(protected activatedRoute: ActivatedRoute,
              protected layoutCardService: MainLayoutCardService) {
  }

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({patientCard}) => {
      this.patientCard = patientCard;
    });
  }

  previousState() {
    window.history.back();
  }
}
