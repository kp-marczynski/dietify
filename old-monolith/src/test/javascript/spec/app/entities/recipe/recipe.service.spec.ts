/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RecipeService } from 'app/entities/recipe/recipe.service';
import { IRecipe, Recipe } from 'app/shared/model/recipe.model';

describe('Service Tests', () => {
    describe('Recipe Service', () => {
        let injector: TestBed;
        let service: RecipeService;
        let httpMock: HttpTestingController;
        let elemDefault: IRecipe;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RecipeService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Recipe(0, 'AAAAAAA', 0, 0, 'image/png', 'AAAAAAA', 0, currentDate, currentDate, false, false, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastEditDate: currentDate.format(DATE_FORMAT)
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

            it('should create a Recipe', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastEditDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        lastEditDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Recipe(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Recipe', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        preparationTimeMinutes: 1,
                        numberOfPortions: 1,
                        image: 'BBBBBB',
                        authorId: 1,
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastEditDate: currentDate.format(DATE_FORMAT),
                        isVisible: true,
                        isLocked: true,
                        languageId: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        lastEditDate: currentDate
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

            it('should return a list of Recipe', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        preparationTimeMinutes: 1,
                        numberOfPortions: 1,
                        image: 'BBBBBB',
                        authorId: 1,
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastEditDate: currentDate.format(DATE_FORMAT),
                        isVisible: true,
                        isLocked: true,
                        languageId: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        lastEditDate: currentDate
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

            it('should delete a Recipe', async () => {
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
