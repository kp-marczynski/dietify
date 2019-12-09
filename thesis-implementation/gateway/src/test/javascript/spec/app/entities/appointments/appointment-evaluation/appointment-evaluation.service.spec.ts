/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AppointmentEvaluationService } from 'app/entities/appointments/appointment-evaluation/appointment-evaluation.service';
import {
  IAppointmentEvaluation,
  AppointmentEvaluation,
  SatisfactionRate
} from 'app/shared/model/appointments/appointment-evaluation.model';

describe('Service Tests', () => {
  describe('AppointmentEvaluation Service', () => {
    let injector: TestBed;
    let service: AppointmentEvaluationService;
    let httpMock: HttpTestingController;
    let elemDefault: IAppointmentEvaluation;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AppointmentEvaluationService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AppointmentEvaluation(
        0,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        SatisfactionRate.VERY_DISSATISFIED,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a AppointmentEvaluation', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new AppointmentEvaluation(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a AppointmentEvaluation', async () => {
        const returnedFromService = Object.assign(
          {
            overallSatisfaction: 'BBBBBB',
            dietitianServiceSatisfaction: 'BBBBBB',
            mealPlanOverallSatisfaction: 'BBBBBB',
            mealCostSatisfaction: 'BBBBBB',
            mealPreparationTimeSatisfaction: 'BBBBBB',
            mealComplexityLevelSatisfaction: 'BBBBBB',
            mealTastefulnessSatisfaction: 'BBBBBB',
            dietaryResultSatisfaction: 'BBBBBB',
            comment: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of AppointmentEvaluation', async () => {
        const returnedFromService = Object.assign(
          {
            overallSatisfaction: 'BBBBBB',
            dietitianServiceSatisfaction: 'BBBBBB',
            mealPlanOverallSatisfaction: 'BBBBBB',
            mealCostSatisfaction: 'BBBBBB',
            mealPreparationTimeSatisfaction: 'BBBBBB',
            mealComplexityLevelSatisfaction: 'BBBBBB',
            mealTastefulnessSatisfaction: 'BBBBBB',
            dietaryResultSatisfaction: 'BBBBBB',
            comment: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AppointmentEvaluation', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
