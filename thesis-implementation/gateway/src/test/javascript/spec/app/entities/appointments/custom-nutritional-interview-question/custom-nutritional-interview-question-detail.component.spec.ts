/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionDetailComponent } from 'app/entities/appointments/custom-nutritional-interview-question/custom-nutritional-interview-question-detail.component';
import { CustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestion Management Detail Component', () => {
    let comp: CustomNutritionalInterviewQuestionDetailComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionDetailComponent>;
    const route = ({
      data: of({ customNutritionalInterviewQuestion: new CustomNutritionalInterviewQuestion(123) })
    } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customNutritionalInterviewQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
