import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDietType, DietType } from 'app/shared/model/products/diet-type.model';
import { DietTypeService } from './diet-type.service';

@Component({
  selector: 'jhi-diet-type-update',
  templateUrl: './diet-type-update.component.html'
})
export class DietTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
  });

  constructor(protected dietTypeService: DietTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dietType }) => {
      this.updateForm(dietType);
    });
  }

  updateForm(dietType: IDietType) {
    this.editForm.patchValue({
      id: dietType.id,
      name: dietType.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dietType = this.createFromForm();
    if (dietType.id !== undefined) {
      this.subscribeToSaveResponse(this.dietTypeService.update(dietType));
    } else {
      this.subscribeToSaveResponse(this.dietTypeService.create(dietType));
    }
  }

  private createFromForm(): IDietType {
    return {
      ...new DietType(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDietType>>) {
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
