/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionUpdateComponent } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question-update.component';
import { CustomNutritionalInterviewQuestionService } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question.service';
import { CustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestion Management Update Component', () => {
    let comp: CustomNutritionalInterviewQuestionUpdateComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionUpdateComponent>;
    let service: CustomNutritionalInterviewQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomNutritionalInterviewQuestionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomNutritionalInterviewQuestion(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomNutritionalInterviewQuestion();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
