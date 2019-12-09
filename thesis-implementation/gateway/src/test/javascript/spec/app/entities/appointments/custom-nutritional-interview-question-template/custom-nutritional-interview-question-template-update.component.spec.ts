/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionTemplateUpdateComponent } from 'app/entities/appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template-update.component';
import { CustomNutritionalInterviewQuestionTemplateService } from 'app/entities/appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template.service';
import { CustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestionTemplate Management Update Component', () => {
    let comp: CustomNutritionalInterviewQuestionTemplateUpdateComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionTemplateUpdateComponent>;
    let service: CustomNutritionalInterviewQuestionTemplateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionTemplateUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionTemplateUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionTemplateUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomNutritionalInterviewQuestionTemplateService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomNutritionalInterviewQuestionTemplate(123);
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
        const entity = new CustomNutritionalInterviewQuestionTemplate();
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
