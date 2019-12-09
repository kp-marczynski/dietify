import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';
import { AssignedMealPlanService } from './assigned-meal-plan.service';

@Component({
  selector: 'jhi-assigned-meal-plan-delete-dialog',
  templateUrl: './assigned-meal-plan-delete-dialog.component.html'
})
export class AssignedMealPlanDeleteDialogComponent {
  assignedMealPlan: IAssignedMealPlan;

  constructor(
    protected assignedMealPlanService: AssignedMealPlanService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.assignedMealPlanService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'assignedMealPlanListModification',
        content: 'Deleted an assignedMealPlan'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-assigned-meal-plan-delete-popup',
  template: ''
})
export class AssignedMealPlanDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ assignedMealPlan }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AssignedMealPlanDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.assignedMealPlan = assignedMealPlan;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/assigned-meal-plan', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/assigned-meal-plan', { outlets: { popup: null } }]);
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
