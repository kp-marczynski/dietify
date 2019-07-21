import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';
import { MealPlanSuitableForDietService } from './meal-plan-suitable-for-diet.service';

@Component({
  selector: 'jhi-meal-plan-suitable-for-diet-delete-dialog',
  templateUrl: './meal-plan-suitable-for-diet-delete-dialog.component.html'
})
export class MealPlanSuitableForDietDeleteDialogComponent {
  mealPlanSuitableForDiet: IMealPlanSuitableForDiet;

  constructor(
    protected mealPlanSuitableForDietService: MealPlanSuitableForDietService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealPlanSuitableForDietService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mealPlanSuitableForDietListModification',
        content: 'Deleted an mealPlanSuitableForDiet'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meal-plan-suitable-for-diet-delete-popup',
  template: ''
})
export class MealPlanSuitableForDietDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealPlanSuitableForDiet }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MealPlanSuitableForDietDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.mealPlanSuitableForDiet = mealPlanSuitableForDiet;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meal-plan-suitable-for-diet', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meal-plan-suitable-for-diet', { outlets: { popup: null } }]);
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
