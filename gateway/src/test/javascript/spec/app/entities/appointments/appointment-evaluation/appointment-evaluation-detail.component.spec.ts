/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AppointmentEvaluationDetailComponent } from 'app/entities/appointments/appointment-evaluation/appointment-evaluation-detail.component';
import { AppointmentEvaluation } from 'app/shared/model/appointments/appointment-evaluation.model';

describe('Component Tests', () => {
  describe('AppointmentEvaluation Management Detail Component', () => {
    let comp: AppointmentEvaluationDetailComponent;
    let fixture: ComponentFixture<AppointmentEvaluationDetailComponent>;
    const route = ({ data: of({ appointmentEvaluation: new AppointmentEvaluation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AppointmentEvaluationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AppointmentEvaluationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppointmentEvaluationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appointmentEvaluation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
