import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealProduct } from 'app/shared/model/meal-product.model';
import { MealProductService } from './meal-product.service';

@Component({
    selector: 'jhi-meal-product-delete-dialog',
    templateUrl: './meal-product-delete-dialog.component.html'
})
export class MealProductDeleteDialogComponent {
    mealProduct: IMealProduct;

    constructor(
        protected mealProductService: MealProductService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mealProductListModification',
                content: 'Deleted an mealProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-product-delete-popup',
    template: ''
})
export class MealProductDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MealProductDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mealProduct = mealProduct;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meal-product', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meal-product', { outlets: { popup: null } }]);
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
