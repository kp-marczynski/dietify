import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

type EntityResponseType = HttpResponse<IRecipeBasicNutritionData>;
type EntityArrayResponseType = HttpResponse<IRecipeBasicNutritionData[]>;

@Injectable({ providedIn: 'root' })
export class RecipeBasicNutritionDataService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/recipe-basic-nutrition-data';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/recipe-basic-nutrition-data';

  constructor(protected http: HttpClient) {}

  create(recipeBasicNutritionData: IRecipeBasicNutritionData): Observable<EntityResponseType> {
    return this.http.post<IRecipeBasicNutritionData>(this.resourceUrl, recipeBasicNutritionData, { observe: 'response' });
  }

  update(recipeBasicNutritionData: IRecipeBasicNutritionData): Observable<EntityResponseType> {
    return this.http.put<IRecipeBasicNutritionData>(this.resourceUrl, recipeBasicNutritionData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecipeBasicNutritionData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeBasicNutritionData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeBasicNutritionData[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
