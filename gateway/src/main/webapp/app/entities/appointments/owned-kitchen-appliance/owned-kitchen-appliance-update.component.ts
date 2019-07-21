import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOwnedKitchenAppliance, OwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';
import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview';

@Component({
  selector: 'jhi-owned-kitchen-appliance-update',
  templateUrl: './owned-kitchen-appliance-update.component.html'
})
export class OwnedKitchenApplianceUpdateComponent implements OnInit {
  isSaving: boolean;

  nutritionalinterviews: INutritionalInterview[];

  editForm = this.fb.group({
    id: [],
    kitchenApplianceId: [null, [Validators.required]],
    nutritionalInterviewId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ownedKitchenApplianceService: OwnedKitchenApplianceService,
    protected nutritionalInterviewService: NutritionalInterviewService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ownedKitchenAppliance }) => {
      this.updateForm(ownedKitchenAppliance);
    });
    this.nutritionalInterviewService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INutritionalInterview[]>) => mayBeOk.ok),
        map((response: HttpResponse<INutritionalInterview[]>) => response.body)
      )
      .subscribe(
        (res: INutritionalInterview[]) => (this.nutritionalinterviews = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ownedKitchenAppliance: IOwnedKitchenAppliance) {
    this.editForm.patchValue({
      id: ownedKitchenAppliance.id,
      kitchenApplianceId: ownedKitchenAppliance.kitchenApplianceId,
      nutritionalInterviewId: ownedKitchenAppliance.nutritionalInterviewId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ownedKitchenAppliance = this.createFromForm();
    if (ownedKitchenAppliance.id !== undefined) {
      this.subscribeToSaveResponse(this.ownedKitchenApplianceService.update(ownedKitchenAppliance));
    } else {
      this.subscribeToSaveResponse(this.ownedKitchenApplianceService.create(ownedKitchenAppliance));
    }
  }

  private createFromForm(): IOwnedKitchenAppliance {
    return {
      ...new OwnedKitchenAppliance(),
      id: this.editForm.get(['id']).value,
      kitchenApplianceId: this.editForm.get(['kitchenApplianceId']).value,
      nutritionalInterviewId: this.editForm.get(['nutritionalInterviewId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOwnedKitchenAppliance>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackNutritionalInterviewById(index: number, item: INutritionalInterview) {
    return item.id;
  }
}
