import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDishType, DishType } from 'app/shared/model/recipes/dish-type.model';
import { DishTypeService } from './dish-type.service';

@Component({
  selector: 'jhi-dish-type-update',
  templateUrl: './dish-type-update.component.html'
})
export class DishTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
  });

  constructor(protected dishTypeService: DishTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dishType }) => {
      this.updateForm(dishType);
    });
  }

  updateForm(dishType: IDishType) {
    this.editForm.patchValue({
      id: dishType.id,
      description: dishType.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dishType = this.createFromForm();
    if (dishType.id !== undefined) {
      this.subscribeToSaveResponse(this.dishTypeService.update(dishType));
    } else {
      this.subscribeToSaveResponse(this.dishTypeService.create(dishType));
    }
  }

  private createFromForm(): IDishType {
    return {
      ...new DishType(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDishType>>) {
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
