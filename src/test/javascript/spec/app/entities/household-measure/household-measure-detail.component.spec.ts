/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { HouseholdMeasureDetailComponent } from 'app/entities/household-measure/household-measure-detail.component';
import { HouseholdMeasure } from 'app/shared/model/household-measure.model';

describe('Component Tests', () => {
    describe('HouseholdMeasure Management Detail Component', () => {
        let comp: HouseholdMeasureDetailComponent;
        let fixture: ComponentFixture<HouseholdMeasureDetailComponent>;
        const route = ({ data: of({ householdMeasure: new HouseholdMeasure(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [HouseholdMeasureDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HouseholdMeasureDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseholdMeasureDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.householdMeasure).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
