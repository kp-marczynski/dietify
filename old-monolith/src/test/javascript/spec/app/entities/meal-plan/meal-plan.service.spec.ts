/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MealPlanService } from 'app/entities/meal-plan/meal-plan.service';
import { IMealPlan, MealPlan } from 'app/shared/model/meal-plan.model';

describe('Service Tests', () => {
    describe('MealPlan Service', () => {
        let injector: TestBed;
        let service: MealPlanService;
        let httpMock: HttpTestingController;
        let elemDefault: IMealPlan;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MealPlanService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new MealPlan(0, 0, currentDate, 'AAAAAAA', false, false, 0, 0, 0, 0, 0, 0, 0);
        });

        describe('Service methods', async () => {
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MealPlan', async () => {
                const returnedFromService = Object.assign(
                    {
                        authorId: 1,
                        creationDate: currentDate.format(DATE_FORMAT),
                        name: 'BBBBBB',
                        isVisible: true,
                        isLocked: true,
                        languageId: 1,
                        numberOfDays: 1,
                        numberOfMealsPerDay: 1,
                        totalDailyEnergyKcal: 1,
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of MealPlan', async () => {
                const returnedFromService = Object.assign(
                    {
                        authorId: 1,
                        creationDate: currentDate.format(DATE_FORMAT),
                        name: 'BBBBBB',
                        isVisible: true,
                        isLocked: true,
                        languageId: 1,
                        numberOfDays: 1,
                        numberOfMealsPerDay: 1,
                        totalDailyEnergyKcal: 1,
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
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a MealPlan', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
