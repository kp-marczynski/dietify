import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IKitchenAppliance, KitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';

@Component({
  selector: 'jhi-kitchen-appliance-update',
  templateUrl: './kitchen-appliance-update.component.html'
})
export class KitchenApplianceUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
  });

  constructor(
    protected kitchenApplianceService: KitchenApplianceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ kitchenAppliance }) => {
      this.updateForm(kitchenAppliance);
    });
  }

  updateForm(kitchenAppliance: IKitchenAppliance) {
    this.editForm.patchValue({
      id: kitchenAppliance.id,
      name: kitchenAppliance.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const kitchenAppliance = this.createFromForm();
    if (kitchenAppliance.id !== undefined) {
      this.subscribeToSaveResponse(this.kitchenApplianceService.update(kitchenAppliance));
    } else {
      this.subscribeToSaveResponse(this.kitchenApplianceService.create(kitchenAppliance));
    }
  }

  private createFromForm(): IKitchenAppliance {
    return {
      ...new KitchenAppliance(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKitchenAppliance>>) {
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
