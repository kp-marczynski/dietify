import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';
import { BodyMeasurmentService } from './body-measurment.service';

@Component({
    selector: 'jhi-body-measurment-delete-dialog',
    templateUrl: './body-measurment-delete-dialog.component.html'
})
export class BodyMeasurmentDeleteDialogComponent {
    bodyMeasurment: IBodyMeasurment;

    constructor(
        protected bodyMeasurmentService: BodyMeasurmentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bodyMeasurmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bodyMeasurmentListModification',
                content: 'Deleted an bodyMeasurment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-body-measurment-delete-popup',
    template: ''
})
export class BodyMeasurmentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bodyMeasurment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BodyMeasurmentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.bodyMeasurment = bodyMeasurment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/body-measurment', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/body-measurment', { outlets: { popup: null } }]);
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
