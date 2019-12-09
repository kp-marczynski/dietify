/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionComponent } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question.component';
import { CustomNutritionalInterviewQuestionService } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question.service';
import { CustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestion Management Component', () => {
    let comp: CustomNutritionalInterviewQuestionComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionComponent>;
    let service: CustomNutritionalInterviewQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionComponent],
        providers: []
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomNutritionalInterviewQuestionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomNutritionalInterviewQuestion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customNutritionalInterviewQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
