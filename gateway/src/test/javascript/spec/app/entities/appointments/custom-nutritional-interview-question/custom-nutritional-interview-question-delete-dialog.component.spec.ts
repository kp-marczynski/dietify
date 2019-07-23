/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionDeleteDialogComponent } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question-delete-dialog.component';
import { CustomNutritionalInterviewQuestionService } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question.service';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestion Management Delete Component', () => {
    let comp: CustomNutritionalInterviewQuestionDeleteDialogComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionDeleteDialogComponent>;
    let service: CustomNutritionalInterviewQuestionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionDeleteDialogComponent]
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomNutritionalInterviewQuestionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
