/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AppointmentEvaluationUpdateComponent } from 'app/entities/appointments/appointment-evaluation/appointment-evaluation-update.component';
import { AppointmentEvaluationService } from 'app/entities/appointments/appointment-evaluation/appointment-evaluation.service';
import { AppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';

describe('Component Tests', () => {
  describe('AppointmentEvaluation Management Update Component', () => {
    let comp: AppointmentEvaluationUpdateComponent;
    let fixture: ComponentFixture<AppointmentEvaluationUpdateComponent>;
    let service: AppointmentEvaluationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AppointmentEvaluationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AppointmentEvaluationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppointmentEvaluationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppointmentEvaluationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppointmentEvaluation(123);
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
        const entity = new AppointmentEvaluation();
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
