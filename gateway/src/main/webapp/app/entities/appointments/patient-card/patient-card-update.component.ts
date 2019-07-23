import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IPatientCard, PatientCard } from 'app/shared/model/appointments/patient-card.model';
import { PatientCardService } from './patient-card.service';

@Component({
  selector: 'jhi-patient-card-update',
  templateUrl: './patient-card-update.component.html'
})
export class PatientCardUpdateComponent implements OnInit {
  isSaving: boolean;
  creationDateDp: any;

  editForm = this.fb.group({
    id: [],
    creationDate: [null, [Validators.required]],
    dietitianId: [null, [Validators.required]],
    patientId: [null, [Validators.required]]
  });

  constructor(protected patientCardService: PatientCardService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ patientCard }) => {
      this.updateForm(patientCard);
    });
  }

  updateForm(patientCard: IPatientCard) {
    this.editForm.patchValue({
      id: patientCard.id,
      creationDate: patientCard.creationDate,
      dietitianId: patientCard.dietitianId,
      patientId: patientCard.patientId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const patientCard = this.createFromForm();
    if (patientCard.id !== undefined) {
      this.subscribeToSaveResponse(this.patientCardService.update(patientCard));
    } else {
      this.subscribeToSaveResponse(this.patientCardService.create(patientCard));
    }
  }

  private createFromForm(): IPatientCard {
    return {
      ...new PatientCard(),
      id: this.editForm.get(['id']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      dietitianId: this.editForm.get(['dietitianId']).value,
      patientId: this.editForm.get(['patientId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientCard>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
