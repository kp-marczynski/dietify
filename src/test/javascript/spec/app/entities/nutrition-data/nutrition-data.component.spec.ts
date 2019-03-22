/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { NutritionDataComponent } from 'app/entities/nutrition-data/nutrition-data.component';
import { NutritionDataService } from 'app/entities/nutrition-data/nutrition-data.service';
import { NutritionData } from 'app/shared/model/nutrition-data.model';

describe('Component Tests', () => {
    describe('NutritionData Management Component', () => {
        let comp: NutritionDataComponent;
        let fixture: ComponentFixture<NutritionDataComponent>;
        let service: NutritionDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [NutritionDataComponent],
                providers: []
            })
                .overrideTemplate(NutritionDataComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NutritionDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NutritionDataService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NutritionData(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nutritionData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
