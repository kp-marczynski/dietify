import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Gender, IPatientCard, PatientCard } from 'app/shared/model/appointments/patient-card.model';
import { PatientCardService } from './patient-card.service';
import { Account, AccountService, UserService } from 'app/core';
import { MainLayoutCardService } from 'app/layouts/main/main-layout-card.service';

@Component({
  selector: 'jhi-patient-card-update',
  templateUrl: './patient-card-update.component.html'
})
export class PatientCardUpdateComponent implements OnInit {
  isSaving: boolean;
  patientDateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    creationDate: [null],
    dietitianId: [null, [Validators.required]],
    patientId: [null],
    patientLastName: [null],
    patientFirstName: [null],
    patientGender: [null],
    patientEmail: [null],
    patientPhone: [null],
    patientDateOfBirth: null,
    additionalPatientInfo: null
  });

  constructor(
    protected layoutCardService: MainLayoutCardService,
    protected userService: UserService,
    protected accountService: AccountService,
    protected patientCardService: PatientCardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ patientCard }) => {
      this.updateForm(patientCard);
      if (!patientCard || !patientCard.id) {
        this.accountService.identity().then((account: Account) => {
          this.userService.find(account.login).subscribe(res => {
            this.editForm.patchValue({ dietitianId: res.body.id });
          });
        });
      }
    });
  }

  updateForm(patientCard: IPatientCard) {
    this.editForm.patchValue({
      id: patientCard.id,
      creationDate: patientCard.creationDate,
      dietitianId: patientCard.dietitianId,
      patientId: patientCard.patientId,
      patientLastName: patientCard.patientLastName,
      patientFirstName: patientCard.patientFirstName,
      patientGender: patientCard.patientGender,
      patientEmail: patientCard.patientEmail,
      patientPhone: patientCard.patientPhone,
      patientDateOfBirth: patientCard.patientDateOfBirth,
      additionalPatientInfo: patientCard.additionalPatientInfo
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
      patientId: this.editForm.get(['patientId']).value,
      patientLastName: this.editForm.get(['patientLastName']).value,
      patientFirstName: this.editForm.get(['patientFirstName']).value,
      patientGender: this.editForm.get(['patientGender']).value,
      patientEmail: this.editForm.get(['patientEmail']).value,
      patientPhone: this.editForm.get(['patientPhone']).value,
      patientDateOfBirth: this.editForm.get(['patientDateOfBirth']).value,
      additionalPatientInfo: this.editForm.get(['additionalPatientInfo']).value
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
