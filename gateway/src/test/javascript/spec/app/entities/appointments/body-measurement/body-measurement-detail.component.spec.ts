/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BodyMeasurementDetailComponent } from 'app/entities/appointments/body-measurement/body-measurement-detail.component';
import { BodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';

describe('Component Tests', () => {
  describe('BodyMeasurement Management Detail Component', () => {
    let comp: BodyMeasurementDetailComponent;
    let fixture: ComponentFixture<BodyMeasurementDetailComponent>;
    const route = ({ data: of({ bodyMeasurement: new BodyMeasurement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BodyMeasurementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BodyMeasurementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BodyMeasurementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bodyMeasurement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
