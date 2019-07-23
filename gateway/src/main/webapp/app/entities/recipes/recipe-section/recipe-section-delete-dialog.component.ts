import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipeSection } from 'app/shared/model/recipes/recipe-section.model';
import { RecipeSectionService } from './recipe-section.service';

@Component({
  selector: 'jhi-recipe-section-delete-dialog',
  templateUrl: './recipe-section-delete-dialog.component.html'
})
export class RecipeSectionDeleteDialogComponent {
  recipeSection: IRecipeSection;

  constructor(
    protected recipeSectionService: RecipeSectionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.recipeSectionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'recipeSectionListModification',
        content: 'Deleted an recipeSection'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-recipe-section-delete-popup',
  template: ''
})
export class RecipeSectionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipeSection }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RecipeSectionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.recipeSection = recipeSection;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/recipe-section', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/recipe-section', { outlets: { popup: null } }]);
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
