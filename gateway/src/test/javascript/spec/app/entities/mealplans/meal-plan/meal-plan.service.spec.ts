/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MealPlanService } from 'app/entities/mealplans/meal-plan/meal-plan.service';
import { IMealPlan, MealPlan } from 'app/shared/model/mealplans/meal-plan.model';

describe('Service Tests', () => {
  describe('MealPlan Service', () => {
    let injector: TestBed;
    let service: MealPlanService;
    let httpMock: HttpTestingController;
    let elemDefault: IMealPlan;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MealPlanService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new MealPlan(0, 0, currentDate, 'AAAAAAA', false, false, 'AAAAAAA', 0, 0, 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            creationDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a MealPlan', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            creationDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            creationDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new MealPlan(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a MealPlan', async () => {
        const returnedFromService = Object.assign(
          {
            authorId: 1,
            creationDate: currentDate.format(DATE_FORMAT),
            name: 'BBBBBB',
            isVisible: true,
            isLocked: true,
            language: 'BBBBBB',
            numberOfDays: 1,
            numberOfMealsPerDay: 1,
            totalDailyEnergy: 1,
            percentOfProtein: 1,
            percentOfFat: 1,
            percentOfCarbohydrates: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of MealPlan', async () => {
        const returnedFromService = Object.assign(
          {
            authorId: 1,
            creationDate: currentDate.format(DATE_FORMAT),
            name: 'BBBBBB',
            isVisible: true,
            isLocked: true,
            language: 'BBBBBB',
            numberOfDays: 1,
            numberOfMealsPerDay: 1,
            totalDailyEnergy: 1,
            percentOfProtein: 1,
            percentOfFat: 1,
            percentOfCarbohydrates: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            creationDate: currentDate
          },
          returnedFromService
        );
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

      it('should delete a MealPlan', async () => {
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
