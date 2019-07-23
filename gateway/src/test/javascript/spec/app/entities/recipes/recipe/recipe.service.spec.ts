/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RecipeService } from 'app/entities/recipes/recipe/recipe.service';
import { IRecipe, Recipe } from 'app/shared/model/recipes/recipe.model';

describe('Service Tests', () => {
  describe('Recipe Service', () => {
    let injector: TestBed;
    let service: RecipeService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecipe;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(RecipeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Recipe(0, 'AAAAAAA', 0, 0, 'image/png', 'AAAAAAA', 0, currentDate, currentDate, false, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
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
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
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
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
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
            language: 'BBBBBB',
            totalGramsWeight: 1
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
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
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
            language: 'BBBBBB',
            totalGramsWeight: 1
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
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Recipe', async () => {
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
