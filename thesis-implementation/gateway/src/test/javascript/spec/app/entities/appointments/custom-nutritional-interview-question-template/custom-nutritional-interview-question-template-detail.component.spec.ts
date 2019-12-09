/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomNutritionalInterviewQuestionTemplateDetailComponent } from 'app/entities/appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template-detail.component';
import { CustomNutritionalInterviewQuestionTemplate } from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';

describe('Component Tests', () => {
  describe('CustomNutritionalInterviewQuestionTemplate Management Detail Component', () => {
    let comp: CustomNutritionalInterviewQuestionTemplateDetailComponent;
    let fixture: ComponentFixture<CustomNutritionalInterviewQuestionTemplateDetailComponent>;
    const route = ({
      data: of({ customNutritionalInterviewQuestionTemplate: new CustomNutritionalInterviewQuestionTemplate(123) })
    } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomNutritionalInterviewQuestionTemplateDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CustomNutritionalInterviewQuestionTemplateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomNutritionalInterviewQuestionTemplateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customNutritionalInterviewQuestionTemplate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
