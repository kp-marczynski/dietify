/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionalInterviewUpdateComponent } from 'app/entities/appointments/nutritional-interview/nutritional-interview-update.component';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview/nutritional-interview.service';
import { NutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

describe('Component Tests', () => {
  describe('NutritionalInterview Management Update Component', () => {
    let comp: NutritionalInterviewUpdateComponent;
    let fixture: ComponentFixture<NutritionalInterviewUpdateComponent>;
    let service: NutritionalInterviewService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionalInterviewUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NutritionalInterviewUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NutritionalInterviewUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionalInterviewService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NutritionalInterview(123);
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
        const entity = new NutritionalInterview();
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
