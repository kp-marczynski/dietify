import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';
import { MealPlanService } from './meal-plan.service';

@Component({
  selector: 'jhi-meal-plan-delete-dialog',
  templateUrl: './meal-plan-delete-dialog.component.html'
})
export class MealPlanDeleteDialogComponent {
  mealPlan: IMealPlan;

  constructor(protected mealPlanService: MealPlanService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealPlanService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mealPlanListModification',
        content: 'Deleted an mealPlan'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meal-plan-delete-popup',
  template: ''
})
export class MealPlanDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealPlan }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MealPlanDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mealPlan = mealPlan;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meal-plan', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meal-plan', { outlets: { popup: null } }]);
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
