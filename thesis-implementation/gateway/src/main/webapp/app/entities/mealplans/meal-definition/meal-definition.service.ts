import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealDefinition } from 'app/shared/model/mealplans/meal-definition.model';

type EntityResponseType = HttpResponse<IMealDefinition>;
type EntityArrayResponseType = HttpResponse<IMealDefinition[]>;

@Injectable({ providedIn: 'root' })
export class MealDefinitionService {
  public resourceUrl = SERVER_API_URL + 'services/mealplans/api/meal-definitions';
  public resourceSearchUrl = SERVER_API_URL + 'services/mealplans/api/_search/meal-definitions';

  constructor(protected http: HttpClient) {}

  create(mealDefinition: IMealDefinition): Observable<EntityResponseType> {
    return this.http.post<IMealDefinition>(this.resourceUrl, mealDefinition, { observe: 'response' });
  }

  update(mealDefinition: IMealDefinition): Observable<EntityResponseType> {
    return this.http.put<IMealDefinition>(this.resourceUrl, mealDefinition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMealDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealDefinition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealDefinition[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
