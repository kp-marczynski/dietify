/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { MealTypeComponent } from 'app/entities/meal-type/meal-type.component';
import { MealTypeService } from 'app/entities/meal-type/meal-type.service';
import { MealType } from 'app/shared/model/meal-type.model';

describe('Component Tests', () => {
    describe('MealType Management Component', () => {
        let comp: MealTypeComponent;
        let fixture: ComponentFixture<MealTypeComponent>;
        let service: MealTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealTypeComponent],
                providers: []
            })
                .overrideTemplate(MealTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
