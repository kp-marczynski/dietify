/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanUnsuitableForDietComponent } from 'app/entities/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.component';
import { MealPlanUnsuitableForDietService } from 'app/entities/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet.service';
import { MealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';

describe('Component Tests', () => {
    describe('MealPlanUnsuitableForDiet Management Component', () => {
        let comp: MealPlanUnsuitableForDietComponent;
        let fixture: ComponentFixture<MealPlanUnsuitableForDietComponent>;
        let service: MealPlanUnsuitableForDietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanUnsuitableForDietComponent],
                providers: []
            })
                .overrideTemplate(MealPlanUnsuitableForDietComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealPlanUnsuitableForDietComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealPlanUnsuitableForDietService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealPlanUnsuitableForDiet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealPlanUnsuitableForDiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
