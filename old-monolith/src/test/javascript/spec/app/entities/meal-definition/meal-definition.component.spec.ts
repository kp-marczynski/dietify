/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { MealDefinitionComponent } from 'app/entities/meal-definition/meal-definition.component';
import { MealDefinitionService } from 'app/entities/meal-definition/meal-definition.service';
import { MealDefinition } from 'app/shared/model/meal-definition.model';

describe('Component Tests', () => {
    describe('MealDefinition Management Component', () => {
        let comp: MealDefinitionComponent;
        let fixture: ComponentFixture<MealDefinitionComponent>;
        let service: MealDefinitionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealDefinitionComponent],
                providers: []
            })
                .overrideTemplate(MealDefinitionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealDefinitionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealDefinitionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealDefinition(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealDefinitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
