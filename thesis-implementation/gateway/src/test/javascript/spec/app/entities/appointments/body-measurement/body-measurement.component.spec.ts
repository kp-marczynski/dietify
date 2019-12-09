/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BodyMeasurementComponent } from 'app/entities/appointments/body-measurement/body-measurement.component';
import { BodyMeasurementService } from 'app/entities/appointments/body-measurement/body-measurement.service';
import { BodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

describe('Component Tests', () => {
  describe('BodyMeasurement Management Component', () => {
    let comp: BodyMeasurementComponent;
    let fixture: ComponentFixture<BodyMeasurementComponent>;
    let service: BodyMeasurementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BodyMeasurementComponent],
        providers: []
      })
        .overrideTemplate(BodyMeasurementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BodyMeasurementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BodyMeasurementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BodyMeasurement(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bodyMeasurements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
