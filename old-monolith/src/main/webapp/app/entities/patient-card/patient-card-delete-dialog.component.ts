import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPatientCard } from 'app/shared/model/patient-card.model';
import { PatientCardService } from './patient-card.service';

@Component({
    selector: 'jhi-patient-card-delete-dialog',
    templateUrl: './patient-card-delete-dialog.component.html'
})
export class PatientCardDeleteDialogComponent {
    patientCard: IPatientCard;

    constructor(
        protected patientCardService: PatientCardService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.patientCardService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'patientCardListModification',
                content: 'Deleted an patientCard'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-patient-card-delete-popup',
    template: ''
})
export class PatientCardDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ patientCard }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PatientCardDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.patientCard = patientCard;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/patient-card', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/patient-card', { outlets: { popup: null } }]);
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
