import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPreparationStep } from 'app/shared/model/preparation-step.model';
import { PreparationStepService } from './preparation-step.service';

@Component({
    selector: 'jhi-preparation-step-delete-dialog',
    templateUrl: './preparation-step-delete-dialog.component.html'
})
export class PreparationStepDeleteDialogComponent {
    preparationStep: IPreparationStep;

    constructor(
        protected preparationStepService: PreparationStepService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.preparationStepService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'preparationStepListModification',
                content: 'Deleted an preparationStep'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-preparation-step-delete-popup',
    template: ''
})
export class PreparationStepDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preparationStep }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PreparationStepDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.preparationStep = preparationStep;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/preparation-step', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/preparation-step', { outlets: { popup: null } }]);
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
