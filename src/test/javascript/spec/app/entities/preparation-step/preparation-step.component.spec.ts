/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { PreparationStepComponent } from 'app/entities/preparation-step/preparation-step.component';
import { PreparationStepService } from 'app/entities/preparation-step/preparation-step.service';
import { PreparationStep } from 'app/shared/model/preparation-step.model';

describe('Component Tests', () => {
    describe('PreparationStep Management Component', () => {
        let comp: PreparationStepComponent;
        let fixture: ComponentFixture<PreparationStepComponent>;
        let service: PreparationStepService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [PreparationStepComponent],
                providers: []
            })
                .overrideTemplate(PreparationStepComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PreparationStepComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreparationStepService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PreparationStep(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.preparationSteps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
