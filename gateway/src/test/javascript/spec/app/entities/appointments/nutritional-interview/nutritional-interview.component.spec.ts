/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionalInterviewComponent } from 'app/entities/appointments/nutritional-interview/nutritional-interview.component';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview/nutritional-interview.service';
import { NutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

describe('Component Tests', () => {
  describe('NutritionalInterview Management Component', () => {
    let comp: NutritionalInterviewComponent;
    let fixture: ComponentFixture<NutritionalInterviewComponent>;
    let service: NutritionalInterviewService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionalInterviewComponent],
        providers: []
      })
        .overrideTemplate(NutritionalInterviewComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NutritionalInterviewComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionalInterviewService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NutritionalInterview(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.nutritionalInterviews[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
