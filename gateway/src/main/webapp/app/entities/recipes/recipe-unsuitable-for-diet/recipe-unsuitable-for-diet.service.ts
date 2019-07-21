import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';

type EntityResponseType = HttpResponse<IRecipeUnsuitableForDiet>;
type EntityArrayResponseType = HttpResponse<IRecipeUnsuitableForDiet[]>;

@Injectable({ providedIn: 'root' })
export class RecipeUnsuitableForDietService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/recipe-unsuitable-for-diets';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/recipe-unsuitable-for-diets';

  constructor(protected http: HttpClient) {}

  create(recipeUnsuitableForDiet: IRecipeUnsuitableForDiet): Observable<EntityResponseType> {
    return this.http.post<IRecipeUnsuitableForDiet>(this.resourceUrl, recipeUnsuitableForDiet, { observe: 'response' });
  }

  update(recipeUnsuitableForDiet: IRecipeUnsuitableForDiet): Observable<EntityResponseType> {
    return this.http.put<IRecipeUnsuitableForDiet>(this.resourceUrl, recipeUnsuitableForDiet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecipeUnsuitableForDiet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeUnsuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeUnsuitableForDiet[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
