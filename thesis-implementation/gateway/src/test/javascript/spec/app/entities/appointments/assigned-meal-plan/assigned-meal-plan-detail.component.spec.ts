/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AssignedMealPlanDetailComponent } from 'app/entities/appointments/assigned-meal-plan/assigned-meal-plan-detail.component';
import { AssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

describe('Component Tests', () => {
  describe('AssignedMealPlan Management Detail Component', () => {
    let comp: AssignedMealPlanDetailComponent;
    let fixture: ComponentFixture<AssignedMealPlanDetailComponent>;
    const route = ({ data: of({ assignedMealPlan: new AssignedMealPlan(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AssignedMealPlanDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AssignedMealPlanDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AssignedMealPlanDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.assignedMealPlan).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
