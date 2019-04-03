import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductPortion } from 'app/shared/model/product-portion.model';
import { ProductPortionService } from './product-portion.service';

@Component({
    selector: 'jhi-product-portion-delete-dialog',
    templateUrl: './product-portion-delete-dialog.component.html'
})
export class ProductPortionDeleteDialogComponent {
    productPortion: IProductPortion;

    constructor(
        protected productPortionService: ProductPortionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productPortionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productPortionListModification',
                content: 'Deleted an productPortion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-portion-delete-popup',
    template: ''
})
export class ProductPortionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productPortion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductPortionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productPortion = productPortion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-portion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-portion', { outlets: { popup: null } }]);
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
