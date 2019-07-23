import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILandingPageCard } from 'app/shared/model/landing-page-card.model';
import { LandingPageCardService } from './landing-page-card.service';

@Component({
  selector: 'jhi-landing-page-card-delete-dialog',
  templateUrl: './landing-page-card-delete-dialog.component.html'
})
export class LandingPageCardDeleteDialogComponent {
  landingPageCard: ILandingPageCard;

  constructor(
    protected landingPageCardService: LandingPageCardService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.landingPageCardService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'landingPageCardListModification',
        content: 'Deleted an landingPageCard'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-landing-page-card-delete-popup',
  template: ''
})
export class LandingPageCardDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ landingPageCard }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LandingPageCardDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.landingPageCard = landingPageCard;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/landing-page-card', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/landing-page-card', { outlets: { popup: null } }]);
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
