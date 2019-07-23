/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionalInterviewDetailComponent } from 'app/entities/appointments/nutritional-interview/nutritional-interview-detail.component';
import { NutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

describe('Component Tests', () => {
  describe('NutritionalInterview Management Detail Component', () => {
    let comp: NutritionalInterviewDetailComponent;
    let fixture: ComponentFixture<NutritionalInterviewDetailComponent>;
    const route = ({ data: of({ nutritionalInterview: new NutritionalInterview(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionalInterviewDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NutritionalInterviewDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NutritionalInterviewDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nutritionalInterview).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
