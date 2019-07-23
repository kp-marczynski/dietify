import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDietetician } from 'app/shared/model/dietetician.model';
import { DieteticianService } from './dietetician.service';

@Component({
    selector: 'jhi-dietetician-delete-dialog',
    templateUrl: './dietetician-delete-dialog.component.html'
})
export class DieteticianDeleteDialogComponent {
    dietetician: IDietetician;

    constructor(
        protected dieteticianService: DieteticianService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dieteticianService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dieteticianListModification',
                content: 'Deleted an dietetician'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dietetician-delete-popup',
    template: ''
})
export class DieteticianDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dietetician }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DieteticianDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dietetician = dietetician;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/dietetician', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/dietetician', { outlets: { popup: null } }]);
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
