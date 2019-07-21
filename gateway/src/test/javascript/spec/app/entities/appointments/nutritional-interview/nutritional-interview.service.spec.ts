/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { NutritionalInterviewService } from 'app/entities/appointments/nutritional-interview/nutritional-interview.service';
import {
  INutritionalInterview,
  NutritionalInterview,
  PhysicalActivity,
  JobType
} from 'app/shared/model/appointments/nutritional-interview.model';

describe('Service Tests', () => {
  describe('NutritionalInterview Service', () => {
    let injector: TestBed;
    let service: NutritionalInterviewService;
    let httpMock: HttpTestingController;
    let elemDefault: INutritionalInterview;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NutritionalInterviewService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new NutritionalInterview(
        0,
        currentDate,
        0,
        'AAAAAAA',
        PhysicalActivity.EXTREMELY_INACTIVE,
        'AAAAAAA',
        'AAAAAAA',
        JobType.SITTING,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            completionDate: currentDate.format(DATE_FORMAT)
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

      it('should create a NutritionalInterview', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            completionDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            completionDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new NutritionalInterview(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NutritionalInterview', async () => {
        const returnedFromService = Object.assign(
          {
            completionDate: currentDate.format(DATE_FORMAT),
            targetWeight: 1,
            advicePurpose: 'BBBBBB',
            physicalActivity: 'BBBBBB',
            diseases: 'BBBBBB',
            medicines: 'BBBBBB',
            jobType: 'BBBBBB',
            likedProducts: 'BBBBBB',
            dislikedProducts: 'BBBBBB',
            foodAllergies: 'BBBBBB',
            foodIntolerances: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            completionDate: currentDate
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

      it('should return a list of NutritionalInterview', async () => {
        const returnedFromService = Object.assign(
          {
            completionDate: currentDate.format(DATE_FORMAT),
            targetWeight: 1,
            advicePurpose: 'BBBBBB',
            physicalActivity: 'BBBBBB',
            diseases: 'BBBBBB',
            medicines: 'BBBBBB',
            jobType: 'BBBBBB',
            likedProducts: 'BBBBBB',
            dislikedProducts: 'BBBBBB',
            foodAllergies: 'BBBBBB',
            foodIntolerances: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            completionDate: currentDate
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

      it('should delete a NutritionalInterview', async () => {
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
