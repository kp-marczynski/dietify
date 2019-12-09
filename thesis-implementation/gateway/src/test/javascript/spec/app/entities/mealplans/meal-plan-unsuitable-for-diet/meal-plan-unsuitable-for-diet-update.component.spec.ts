/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanUnsuitableForDietUpdateComponent } from 'app/entities/mealplans/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet-update.component';
import { MealPlanUnsuitableForDietService } from 'app/entities/mealplans/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.service';
import { MealPlanUnsuitableForDiet } from 'app/shared/model/mealplans/meal-plan-unsuitable-for-diet.model';

describe('Component Tests', () => {
  describe('MealPlanUnsuitableForDiet Management Update Component', () => {
    let comp: MealPlanUnsuitableForDietUpdateComponent;
    let fixture: ComponentFixture<MealPlanUnsuitableForDietUpdateComponent>;
    let service: MealPlanUnsuitableForDietService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanUnsuitableForDietUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealPlanUnsuitableForDietUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealPlanUnsuitableForDietUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealPlanUnsuitableForDietService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealPlanUnsuitableForDiet(123);
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
        const entity = new MealPlanUnsuitableForDiet();
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
