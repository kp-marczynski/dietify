/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { PreparationStepDetailComponent } from 'app/entities/preparation-step/preparation-step-detail.component';
import { PreparationStep } from 'app/shared/model/preparation-step.model';

describe('Component Tests', () => {
    describe('PreparationStep Management Detail Component', () => {
        let comp: PreparationStepDetailComponent;
        let fixture: ComponentFixture<PreparationStepDetailComponent>;
        const route = ({ data: of({ preparationStep: new PreparationStep(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [PreparationStepDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PreparationStepDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PreparationStepDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.preparationStep).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
