import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';
import { CustomNutritionalInterviewQuestionTemplateService } from './custom-nutritional-interview-question-template.service';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-template-delete-dialog',
  templateUrl: './custom-nutritional-interview-question-template-delete-dialog.component.html'
})
export class CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent {
  customNutritionalInterviewQuestionTemplate: ICustomNutritionalInterviewQuestionTemplate;

  constructor(
    protected customNutritionalInterviewQuestionTemplateService: CustomNutritionalInterviewQuestionTemplateService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.customNutritionalInterviewQuestionTemplateService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'customNutritionalInterviewQuestionTemplateListModification',
        content: 'Deleted an customNutritionalInterviewQuestionTemplate'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-custom-nutritional-interview-question-template-delete-popup',
  template: ''
})
export class CustomNutritionalInterviewQuestionTemplateDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customNutritionalInterviewQuestionTemplate }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.customNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplate;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/custom-nutritional-interview-question-template', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/custom-nutritional-interview-question-template', { outlets: { popup: null } }]);
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
