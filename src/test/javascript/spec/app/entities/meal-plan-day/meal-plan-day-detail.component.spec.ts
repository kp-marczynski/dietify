/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanDayDetailComponent } from 'app/entities/meal-plan-day/meal-plan-day-detail.component';
import { MealPlanDay } from 'app/shared/model/meal-plan-day.model';

describe('Component Tests', () => {
    describe('MealPlanDay Management Detail Component', () => {
        let comp: MealPlanDayDetailComponent;
        let fixture: ComponentFixture<MealPlanDayDetailComponent>;
        const route = ({ data: of({ mealPlanDay: new MealPlanDay(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanDayDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealPlanDayDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealPlanDayDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealPlanDay).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
