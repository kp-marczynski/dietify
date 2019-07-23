/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AssignedMealPlanUpdateComponent } from 'app/entities/appointments/assigned-meal-plan/assigned-meal-plan-update.component';
import { AssignedMealPlanService } from 'app/entities/appointments/assigned-meal-plan/assigned-meal-plan.service';
import { AssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

describe('Component Tests', () => {
  describe('AssignedMealPlan Management Update Component', () => {
    let comp: AssignedMealPlanUpdateComponent;
    let fixture: ComponentFixture<AssignedMealPlanUpdateComponent>;
    let service: AssignedMealPlanService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AssignedMealPlanUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AssignedMealPlanUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AssignedMealPlanUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssignedMealPlanService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AssignedMealPlan(123);
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
        const entity = new AssignedMealPlan();
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
