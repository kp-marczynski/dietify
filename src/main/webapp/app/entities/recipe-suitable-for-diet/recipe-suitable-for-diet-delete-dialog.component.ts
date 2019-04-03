import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipeSuitableForDiet } from 'app/shared/model/recipe-suitable-for-diet.model';
import { RecipeSuitableForDietService } from './recipe-suitable-for-diet.service';

@Component({
    selector: 'jhi-recipe-suitable-for-diet-delete-dialog',
    templateUrl: './recipe-suitable-for-diet-delete-dialog.component.html'
})
export class RecipeSuitableForDietDeleteDialogComponent {
    recipeSuitableForDiet: IRecipeSuitableForDiet;

    constructor(
        protected recipeSuitableForDietService: RecipeSuitableForDietService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recipeSuitableForDietService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'recipeSuitableForDietListModification',
                content: 'Deleted an recipeSuitableForDiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recipe-suitable-for-diet-delete-popup',
    template: ''
})
export class RecipeSuitableForDietDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recipeSuitableForDiet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RecipeSuitableForDietDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.recipeSuitableForDiet = recipeSuitableForDiet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/recipe-suitable-for-diet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/recipe-suitable-for-diet', { outlets: { popup: null } }]);
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
