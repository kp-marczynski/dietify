/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { AssignedMealPlanComponent } from 'app/entities/appointments/assigned-meal-plan/assigned-meal-plan.component';
import { AssignedMealPlanService } from 'app/entities/appointments/assigned-meal-plan/assigned-meal-plan.service';
import { AssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

describe('Component Tests', () => {
  describe('AssignedMealPlan Management Component', () => {
    let comp: AssignedMealPlanComponent;
    let fixture: ComponentFixture<AssignedMealPlanComponent>;
    let service: AssignedMealPlanService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AssignedMealPlanComponent],
        providers: []
      })
        .overrideTemplate(AssignedMealPlanComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AssignedMealPlanComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssignedMealPlanService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AssignedMealPlan(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.assignedMealPlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
