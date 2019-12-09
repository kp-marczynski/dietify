/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanSuitableForDietUpdateComponent } from 'app/entities/mealplans/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet-update.component';
import { MealPlanSuitableForDietService } from 'app/entities/mealplans/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.service';
import { MealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';

describe('Component Tests', () => {
  describe('MealPlanSuitableForDiet Management Update Component', () => {
    let comp: MealPlanSuitableForDietUpdateComponent;
    let fixture: ComponentFixture<MealPlanSuitableForDietUpdateComponent>;
    let service: MealPlanSuitableForDietService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanSuitableForDietUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealPlanSuitableForDietUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealPlanSuitableForDietUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealPlanSuitableForDietService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealPlanSuitableForDiet(123);
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
        const entity = new MealPlanSuitableForDiet();
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
