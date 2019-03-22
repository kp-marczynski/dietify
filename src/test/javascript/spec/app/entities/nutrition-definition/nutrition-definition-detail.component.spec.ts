/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { NutritionDefinitionDetailComponent } from 'app/entities/nutrition-definition/nutrition-definition-detail.component';
import { NutritionDefinition } from 'app/shared/model/nutrition-definition.model';

describe('Component Tests', () => {
    describe('NutritionDefinition Management Detail Component', () => {
        let comp: NutritionDefinitionDetailComponent;
        let fixture: ComponentFixture<NutritionDefinitionDetailComponent>;
        const route = ({ data: of({ nutritionDefinition: new NutritionDefinition(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [NutritionDefinitionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NutritionDefinitionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NutritionDefinitionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nutritionDefinition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
