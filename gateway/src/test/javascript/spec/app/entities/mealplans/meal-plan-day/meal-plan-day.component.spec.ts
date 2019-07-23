/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanDayComponent } from 'app/entities/mealplans/meal-plan-day/meal-plan-day.component';
import { MealPlanDayService } from 'app/entities/mealplans/meal-plan-day/meal-plan-day.service';
import { MealPlanDay } from 'app/shared/model/mealplans/meal-plan-day.model';

describe('Component Tests', () => {
  describe('MealPlanDay Management Component', () => {
    let comp: MealPlanDayComponent;
    let fixture: ComponentFixture<MealPlanDayComponent>;
    let service: MealPlanDayService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanDayComponent],
        providers: []
      })
        .overrideTemplate(MealPlanDayComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealPlanDayComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealPlanDayService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MealPlanDay(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mealPlanDays[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
