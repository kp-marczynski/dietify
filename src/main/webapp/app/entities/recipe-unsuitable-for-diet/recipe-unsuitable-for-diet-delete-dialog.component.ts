import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipe-unsuitable-for-diet.model';
import { RecipeUnsuitableForDietService } from './recipe-unsuitable-for-diet.service';

@Component({
    selector: 'jhi-recipe-unsuitable-for-diet-delete-dialog',
    templateUrl: './recipe-unsuitable-for-diet-delete-dialog.component.html'
})
export class RecipeUnsuitableForDietDeleteDialogComponent {
    recipeUnsuitableForDiet: IRecipeUnsuitableForDiet;

    constructor(
        protected recipeUnsuitableForDietService: RecipeUnsuitableForDietService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recipeUnsuitableForDietService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'recipeUnsuitableForDietListModification',
                content: 'Deleted an recipeUnsuitableForDiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recipe-unsuitable-for-diet-delete-popup',
    template: ''
})
export class RecipeUnsuitableForDietDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recipeUnsuitableForDiet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RecipeUnsuitableForDietDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.recipeUnsuitableForDiet = recipeUnsuitableForDiet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/recipe-unsuitable-for-diet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/recipe-unsuitable-for-diet', { outlets: { popup: null } }]);
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
