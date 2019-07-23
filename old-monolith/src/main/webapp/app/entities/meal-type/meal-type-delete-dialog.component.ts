import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealType } from 'app/shared/model/meal-type.model';
import { MealTypeService } from './meal-type.service';

@Component({
    selector: 'jhi-meal-type-delete-dialog',
    templateUrl: './meal-type-delete-dialog.component.html'
})
export class MealTypeDeleteDialogComponent {
    mealType: IMealType;

    constructor(protected mealTypeService: MealTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mealTypeListModification',
                content: 'Deleted an mealType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-type-delete-popup',
    template: ''
})
export class MealTypeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MealTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mealType = mealType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meal-type', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meal-type', { outlets: { popup: null } }]);
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
