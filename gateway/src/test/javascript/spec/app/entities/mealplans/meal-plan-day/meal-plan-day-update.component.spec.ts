/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanDayUpdateComponent } from 'app/entities/mealplans/meal-plan-day/meal-plan-day-update.component';
import { MealPlanDayService } from 'app/entities/mealplans/meal-plan-day/meal-plan-day.service';
import { MealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';

describe('Component Tests', () => {
  describe('MealPlanDay Management Update Component', () => {
    let comp: MealPlanDayUpdateComponent;
    let fixture: ComponentFixture<MealPlanDayUpdateComponent>;
    let service: MealPlanDayService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanDayUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealPlanDayUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealPlanDayUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealPlanDayService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealPlanDay(123);
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
        const entity = new MealPlanDay();
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
