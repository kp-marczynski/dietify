/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanDetailComponent } from 'app/entities/mealplans/meal-plan/meal-plan-detail.component';
import { MealPlan } from 'app/shared/model/mealplans/meal-plan.model';

describe('Component Tests', () => {
  describe('MealPlan Management Detail Component', () => {
    let comp: MealPlanDetailComponent;
    let fixture: ComponentFixture<MealPlanDetailComponent>;
    const route = ({ data: of({ mealPlan: new MealPlan(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MealPlanDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealPlanDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mealPlan).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
