import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';
import { MealRecipeService } from './meal-recipe.service';

@Component({
  selector: 'jhi-meal-recipe-delete-dialog',
  templateUrl: './meal-recipe-delete-dialog.component.html'
})
export class MealRecipeDeleteDialogComponent {
  mealRecipe: IMealRecipe;

  constructor(
    protected mealRecipeService: MealRecipeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealRecipeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mealRecipeListModification',
        content: 'Deleted an mealRecipe'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meal-recipe-delete-popup',
  template: ''
})
export class MealRecipeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealRecipe }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MealRecipeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mealRecipe = mealRecipe;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meal-recipe', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meal-recipe', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
