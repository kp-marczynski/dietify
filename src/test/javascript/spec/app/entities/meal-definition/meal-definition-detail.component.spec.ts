/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { MealDefinitionDetailComponent } from 'app/entities/meal-definition/meal-definition-detail.component';
import { MealDefinition } from 'app/shared/model/meal-definition.model';

describe('Component Tests', () => {
    describe('MealDefinition Management Detail Component', () => {
        let comp: MealDefinitionDetailComponent;
        let fixture: ComponentFixture<MealDefinitionDetailComponent>;
        const route = ({ data: of({ mealDefinition: new MealDefinition(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealDefinitionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealDefinitionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealDefinitionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealDefinition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
