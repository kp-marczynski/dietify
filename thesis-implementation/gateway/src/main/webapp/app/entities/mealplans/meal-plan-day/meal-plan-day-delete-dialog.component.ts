import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';
import { MealPlanDayService } from './meal-plan-day.service';

@Component({
  selector: 'jhi-meal-plan-day-delete-dialog',
  templateUrl: './meal-plan-day-delete-dialog.component.html'
})
export class MealPlanDayDeleteDialogComponent {
  mealPlanDay: IMealPlanDay;

  constructor(
    protected mealPlanDayService: MealPlanDayService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealPlanDayService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mealPlanDayListModification',
        content: 'Deleted an mealPlanDay'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meal-plan-day-delete-popup',
  template: ''
})
export class MealPlanDayDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealPlanDay }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MealPlanDayDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mealPlanDay = mealPlanDay;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meal-plan-day', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meal-plan-day', { outlets: { popup: null } }]);
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
