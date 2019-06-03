/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { BodyMeasurmentComponent } from 'app/entities/body-measurment/body-measurment.component';
import { BodyMeasurmentService } from 'app/entities/body-measurment/body-measurment.service';
import { BodyMeasurment } from 'app/shared/model/body-measurment.model';

describe('Component Tests', () => {
    describe('BodyMeasurment Management Component', () => {
        let comp: BodyMeasurmentComponent;
        let fixture: ComponentFixture<BodyMeasurmentComponent>;
        let service: BodyMeasurmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [BodyMeasurmentComponent],
                providers: []
            })
                .overrideTemplate(BodyMeasurmentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BodyMeasurmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyMeasurmentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BodyMeasurment(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bodyMeasurments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
