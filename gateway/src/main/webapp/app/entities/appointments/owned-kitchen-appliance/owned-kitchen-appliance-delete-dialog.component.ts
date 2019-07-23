import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';

@Component({
  selector: 'jhi-owned-kitchen-appliance-delete-dialog',
  templateUrl: './owned-kitchen-appliance-delete-dialog.component.html'
})
export class OwnedKitchenApplianceDeleteDialogComponent {
  ownedKitchenAppliance: IOwnedKitchenAppliance;

  constructor(
    protected ownedKitchenApplianceService: OwnedKitchenApplianceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ownedKitchenApplianceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ownedKitchenApplianceListModification',
        content: 'Deleted an ownedKitchenAppliance'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-owned-kitchen-appliance-delete-popup',
  template: ''
})
export class OwnedKitchenApplianceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ownedKitchenAppliance }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OwnedKitchenApplianceDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.ownedKitchenAppliance = ownedKitchenAppliance;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/owned-kitchen-appliance', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/owned-kitchen-appliance', { outlets: { popup: null } }]);
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
