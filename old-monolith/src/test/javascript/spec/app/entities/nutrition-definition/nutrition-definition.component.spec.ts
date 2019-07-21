/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { NutritionDefinitionComponent } from 'app/entities/nutrition-definition/nutrition-definition.component';
import { NutritionDefinitionService } from 'app/entities/nutrition-definition/nutrition-definition.service';
import { NutritionDefinition } from 'app/shared/model/nutrition-definition.model';

describe('Component Tests', () => {
    describe('NutritionDefinition Management Component', () => {
        let comp: NutritionDefinitionComponent;
        let fixture: ComponentFixture<NutritionDefinitionComponent>;
        let service: NutritionDefinitionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [NutritionDefinitionComponent],
                providers: []
            })
                .overrideTemplate(NutritionDefinitionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NutritionDefinitionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NutritionDefinitionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NutritionDefinition(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nutritionDefinitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
