/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { BodyMeasurmentUpdateComponent } from 'app/entities/body-measurment/body-measurment-update.component';
import { BodyMeasurmentService } from 'app/entities/body-measurment/body-measurment.service';
import { BodyMeasurment } from 'app/shared/model/body-measurment.model';

describe('Component Tests', () => {
    describe('BodyMeasurment Management Update Component', () => {
        let comp: BodyMeasurmentUpdateComponent;
        let fixture: ComponentFixture<BodyMeasurmentUpdateComponent>;
        let service: BodyMeasurmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [BodyMeasurmentUpdateComponent]
            })
                .overrideTemplate(BodyMeasurmentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BodyMeasurmentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyMeasurmentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BodyMeasurment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bodyMeasurment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BodyMeasurment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bodyMeasurment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
