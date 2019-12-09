import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { IProduct } from 'app/shared/model/products/product.model';

type EntityResponseType = HttpResponse<IRecipe>;
type EntityArrayResponseType = HttpResponse<IRecipe[]>;

@Injectable({ providedIn: 'root' })
export class RecipeService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/recipes';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/recipes';

  constructor(protected http: HttpClient) {}

  create(recipe: IRecipe): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recipe);
    return this.http
      .post<IRecipe>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(recipe: IRecipe): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recipe);
    return this.http
      .put<IRecipe>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  changeToFinal(recipeId: number): Observable<EntityResponseType> {
    return this.http.put<IRecipe>(this.resourceUrl + '/' + recipeId, null, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRecipe>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRecipe[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRecipe[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(recipe: IRecipe): IRecipe {
    const copy: IRecipe = Object.assign({}, recipe, {
      creationTimestamp: recipe.creationTimestamp != null && recipe.creationTimestamp.isValid() ? recipe.creationTimestamp.toJSON() : null,
      lastEditTimestamp: recipe.lastEditTimestamp != null && recipe.lastEditTimestamp.isValid() ? recipe.lastEditTimestamp.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationTimestamp = res.body.creationTimestamp != null ? moment(res.body.creationTimestamp) : null;
      res.body.lastEditTimestamp = res.body.lastEditTimestamp != null ? moment(res.body.lastEditTimestamp) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((recipe: IRecipe) => {
        recipe.creationTimestamp = recipe.creationTimestamp != null ? moment(recipe.creationTimestamp) : null;
        recipe.lastEditTimestamp = recipe.lastEditTimestamp != null ? moment(recipe.lastEditTimestamp) : null;
      });
    }
    return res;
  }
}
