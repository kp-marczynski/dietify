import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';

@Component({
  selector: 'jhi-custom-nutritional-interview-question-delete-dialog',
  templateUrl: './custom-nutritional-interview-question-delete-dialog.component.html'
})
export class CustomNutritionalInterviewQuestionDeleteDialogComponent {
  customNutritionalInterviewQuestion: ICustomNutritionalInterviewQuestion;

  constructor(
    protected customNutritionalInterviewQuestionService: CustomNutritionalInterviewQuestionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.customNutritionalInterviewQuestionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'customNutritionalInterviewQuestionListModification',
        content: 'Deleted an customNutritionalInterviewQuestion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-custom-nutritional-interview-question-delete-popup',
  template: ''
})
export class CustomNutritionalInterviewQuestionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customNutritionalInterviewQuestion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CustomNutritionalInterviewQuestionDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.customNutritionalInterviewQuestion = customNutritionalInterviewQuestion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/custom-nutritional-interview-question', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/custom-nutritional-interview-question', { outlets: { popup: null } }]);
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
