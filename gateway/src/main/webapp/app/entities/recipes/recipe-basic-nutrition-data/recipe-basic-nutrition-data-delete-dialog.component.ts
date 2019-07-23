import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from './recipe-basic-nutrition-data.service';

@Component({
  selector: 'jhi-recipe-basic-nutrition-data-delete-dialog',
  templateUrl: './recipe-basic-nutrition-data-delete-dialog.component.html'
})
export class RecipeBasicNutritionDataDeleteDialogComponent {
  recipeBasicNutritionData: IRecipeBasicNutritionData;

  constructor(
    protected recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.recipeBasicNutritionDataService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'recipeBasicNutritionDataListModification',
        content: 'Deleted an recipeBasicNutritionData'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-recipe-basic-nutrition-data-delete-popup',
  template: ''
})
export class RecipeBasicNutritionDataDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipeBasicNutritionData }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RecipeBasicNutritionDataDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.recipeBasicNutritionData = recipeBasicNutritionData;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/recipe-basic-nutrition-data', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/recipe-basic-nutrition-data', { outlets: { popup: null } }]);
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
