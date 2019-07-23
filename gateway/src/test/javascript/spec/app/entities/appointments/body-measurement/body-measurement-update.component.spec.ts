/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BodyMeasurementUpdateComponent } from 'app/entities/appointments/body-measurement/body-measurement-update.component';
import { BodyMeasurementService } from 'app/entities/appointments/body-measurement/body-measurement.service';
import { BodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

describe('Component Tests', () => {
  describe('BodyMeasurement Management Update Component', () => {
    let comp: BodyMeasurementUpdateComponent;
    let fixture: ComponentFixture<BodyMeasurementUpdateComponent>;
    let service: BodyMeasurementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BodyMeasurementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BodyMeasurementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BodyMeasurementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BodyMeasurementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BodyMeasurement(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BodyMeasurement();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
