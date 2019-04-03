import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKitchenAppliance } from 'app/shared/model/kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';

@Component({
    selector: 'jhi-kitchen-appliance-delete-dialog',
    templateUrl: './kitchen-appliance-delete-dialog.component.html'
})
export class KitchenApplianceDeleteDialogComponent {
    kitchenAppliance: IKitchenAppliance;

    constructor(
        protected kitchenApplianceService: KitchenApplianceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kitchenApplianceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'kitchenApplianceListModification',
                content: 'Deleted an kitchenAppliance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kitchen-appliance-delete-popup',
    template: ''
})
export class KitchenApplianceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kitchenAppliance }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KitchenApplianceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.kitchenAppliance = kitchenAppliance;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/kitchen-appliance', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/kitchen-appliance', { outlets: { popup: null } }]);
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
