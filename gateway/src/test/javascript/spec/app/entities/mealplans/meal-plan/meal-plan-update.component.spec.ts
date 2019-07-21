/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanUpdateComponent } from 'app/entities/mealplans/meal-plan/meal-plan-update.component';
import { MealPlanService } from 'app/entities/mealplans/meal-plan/meal-plan.service';
import { MealPlan } from 'app/shared/model/mealplans/meal-plan.model';

describe('Component Tests', () => {
  describe('MealPlan Management Update Component', () => {
    let comp: MealPlanUpdateComponent;
    let fixture: ComponentFixture<MealPlanUpdateComponent>;
    let service: MealPlanService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealPlanUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealPlanUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealPlanService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealPlan(123);
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
        const entity = new MealPlan();
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
