import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKitchenApplianceTranslation, KitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';
import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { KitchenApplianceService } from 'app/entities/recipes/kitchen-appliance';

@Component({
  selector: 'jhi-kitchen-appliance-translation-update',
  templateUrl: './kitchen-appliance-translation-update.component.html'
})
export class KitchenApplianceTranslationUpdateComponent implements OnInit {
  isSaving: boolean;

  kitchenappliances: IKitchenAppliance[];

  editForm = this.fb.group({
    id: [],
    translation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    kitchenAppliance: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected kitchenApplianceTranslationService: KitchenApplianceTranslationService,
    protected kitchenApplianceService: KitchenApplianceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ kitchenApplianceTranslation }) => {
      this.updateForm(kitchenApplianceTranslation);
    });
    this.kitchenApplianceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IKitchenAppliance[]>) => mayBeOk.ok),
        map((response: HttpResponse<IKitchenAppliance[]>) => response.body)
      )
      .subscribe((res: IKitchenAppliance[]) => (this.kitchenappliances = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(kitchenApplianceTranslation: IKitchenApplianceTranslation) {
    this.editForm.patchValue({
      id: kitchenApplianceTranslation.id,
      translation: kitchenApplianceTranslation.translation,
      language: kitchenApplianceTranslation.language,
      kitchenAppliance: kitchenApplianceTranslation.kitchenAppliance
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const kitchenApplianceTranslation = this.createFromForm();
    if (kitchenApplianceTranslation.id !== undefined) {
      this.subscribeToSaveResponse(this.kitchenApplianceTranslationService.update(kitchenApplianceTranslation));
    } else {
      this.subscribeToSaveResponse(this.kitchenApplianceTranslationService.create(kitchenApplianceTranslation));
    }
  }

  private createFromForm(): IKitchenApplianceTranslation {
    return {
      ...new KitchenApplianceTranslation(),
      id: this.editForm.get(['id']).value,
      translation: this.editForm.get(['translation']).value,
      language: this.editForm.get(['language']).value,
      kitchenAppliance: this.editForm.get(['kitchenAppliance']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKitchenApplianceTranslation>>) {
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

  trackKitchenApplianceById(index: number, item: IKitchenAppliance) {
    return item.id;
  }
}
