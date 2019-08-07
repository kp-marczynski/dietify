import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INutritionDefinition } from 'app/shared/model/products/nutrition-definition.model';

type EntityResponseType = HttpResponse<INutritionDefinition>;
type EntityArrayResponseType = HttpResponse<INutritionDefinition[]>;

@Injectable({ providedIn: 'root' })
export class NutritionDefinitionService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/nutrition-definitions';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/nutrition-definitions';

  constructor(protected http: HttpClient) {}

  create(nutritionDefinition: INutritionDefinition): Observable<EntityResponseType> {
    return this.http.post<INutritionDefinition>(this.resourceUrl, nutritionDefinition, { observe: 'response' });
  }

  update(nutritionDefinition: INutritionDefinition): Observable<EntityResponseType> {
    return this.http.put<INutritionDefinition>(this.resourceUrl, nutritionDefinition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INutritionDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INutritionDefinition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INutritionDefinition[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getBasicDefinitions(): Observable<EntityArrayResponseType> {
    return this.http.get<INutritionDefinition[]>(`${this.resourceUrl}-basic`, { observe: 'response' });
  }
}
