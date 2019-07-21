/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { BodyMeasurmentService } from 'app/entities/body-measurment/body-measurment.service';
import { IBodyMeasurment, BodyMeasurment } from 'app/shared/model/body-measurment.model';

describe('Service Tests', () => {
    describe('BodyMeasurment Service', () => {
        let injector: TestBed;
        let service: BodyMeasurmentService;
        let httpMock: HttpTestingController;
        let elemDefault: IBodyMeasurment;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(BodyMeasurmentService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new BodyMeasurment(0, currentDate, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        });

        describe('Service methods', async () => {
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a BodyMeasurment', async () => {
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
                    .create(new BodyMeasurment(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a BodyMeasurment', async () => {
                const returnedFromService = Object.assign(
                    {
                        completionDate: currentDate.format(DATE_FORMAT),
                        height: 1,
                        weight: 1,
                        waist: 1,
                        percentOfFatTissue: 1,
                        percentOfWater: 1,
                        muscleMass: 1,
                        physicalMark: 1,
                        calciumInBones: 1,
                        basicMetabolism: 1,
                        metabolicAge: 1,
                        visceralFatLevel: 1
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of BodyMeasurment', async () => {
                const returnedFromService = Object.assign(
                    {
                        completionDate: currentDate.format(DATE_FORMAT),
                        height: 1,
                        weight: 1,
                        waist: 1,
                        percentOfFatTissue: 1,
                        percentOfWater: 1,
                        muscleMass: 1,
                        physicalMark: 1,
                        calciumInBones: 1,
                        basicMetabolism: 1,
                        metabolicAge: 1,
                        visceralFatLevel: 1
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
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a BodyMeasurment', async () => {
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
