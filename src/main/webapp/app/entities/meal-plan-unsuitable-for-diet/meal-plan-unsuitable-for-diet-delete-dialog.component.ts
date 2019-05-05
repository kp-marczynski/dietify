import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';
import { MealPlanUnsuitableForDietService } from './meal-plan-unsuitable-for-diet.service';

@Component({
    selector: 'jhi-meal-plan-unsuitable-for-diet-delete-dialog',
    templateUrl: './meal-plan-unsuitable-for-diet-delete-dialog.component.html'
})
export class MealPlanUnsuitableForDietDeleteDialogComponent {
    mealPlanUnsuitableForDiet: IMealPlanUnsuitableForDiet;

    constructor(
        protected mealPlanUnsuitableForDietService: MealPlanUnsuitableForDietService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealPlanUnsuitableForDietService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mealPlanUnsuitableForDietListModification',
                content: 'Deleted an mealPlanUnsuitableForDiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-plan-unsuitable-for-diet-delete-popup',
    template: ''
})
export class MealPlanUnsuitableForDietDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealPlanUnsuitableForDiet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MealPlanUnsuitableForDietDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mealPlanUnsuitableForDiet = mealPlanUnsuitableForDiet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meal-plan-unsuitable-for-diet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meal-plan-unsuitable-for-diet', { outlets: { popup: null } }]);
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
