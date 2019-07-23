import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';

type EntityResponseType = HttpResponse<IMealPlanSuitableForDiet>;
type EntityArrayResponseType = HttpResponse<IMealPlanSuitableForDiet[]>;

@Injectable({ providedIn: 'root' })
export class MealPlanSuitableForDietService {
  public resourceUrl = SERVER_API_URL + 'services/mealplans/api/meal-plan-suitable-for-diets';
  public resourceSearchUrl = SERVER_API_URL + 'services/mealplans/api/_search/meal-plan-suitable-for-diets';

  constructor(protected http: HttpClient) {}

  create(mealPlanSuitableForDiet: IMealPlanSuitableForDiet): Observable<EntityResponseType> {
    return this.http.post<IMealPlanSuitableForDiet>(this.resourceUrl, mealPlanSuitableForDiet, { observe: 'response' });
  }

  update(mealPlanSuitableForDiet: IMealPlanSuitableForDiet): Observable<EntityResponseType> {
    return this.http.put<IMealPlanSuitableForDiet>(this.resourceUrl, mealPlanSuitableForDiet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMealPlanSuitableForDiet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealPlanSuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealPlanSuitableForDiet[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
