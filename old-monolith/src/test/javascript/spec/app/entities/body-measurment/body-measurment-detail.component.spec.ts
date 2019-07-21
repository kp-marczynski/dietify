/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { BodyMeasurmentDetailComponent } from 'app/entities/body-measurment/body-measurment-detail.component';
import { BodyMeasurment } from 'app/shared/model/body-measurment.model';

describe('Component Tests', () => {
    describe('BodyMeasurment Management Detail Component', () => {
        let comp: BodyMeasurmentDetailComponent;
        let fixture: ComponentFixture<BodyMeasurmentDetailComponent>;
        const route = ({ data: of({ bodyMeasurment: new BodyMeasurment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [BodyMeasurmentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BodyMeasurmentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BodyMeasurmentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bodyMeasurment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
