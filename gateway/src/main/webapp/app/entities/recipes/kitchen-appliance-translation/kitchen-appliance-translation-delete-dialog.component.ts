import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';

@Component({
  selector: 'jhi-kitchen-appliance-translation-delete-dialog',
  templateUrl: './kitchen-appliance-translation-delete-dialog.component.html'
})
export class KitchenApplianceTranslationDeleteDialogComponent {
  kitchenApplianceTranslation: IKitchenApplianceTranslation;

  constructor(
    protected kitchenApplianceTranslationService: KitchenApplianceTranslationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.kitchenApplianceTranslationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'kitchenApplianceTranslationListModification',
        content: 'Deleted an kitchenApplianceTranslation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-kitchen-appliance-translation-delete-popup',
  template: ''
})
export class KitchenApplianceTranslationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kitchenApplianceTranslation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(KitchenApplianceTranslationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.kitchenApplianceTranslation = kitchenApplianceTranslation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/kitchen-appliance-translation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/kitchen-appliance-translation', { outlets: { popup: null } }]);
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
