import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';

type EntityResponseType = HttpResponse<INutritionDefinitionTranslation>;
type EntityArrayResponseType = HttpResponse<INutritionDefinitionTranslation[]>;

@Injectable({ providedIn: 'root' })
export class NutritionDefinitionTranslationService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/nutrition-definition-translations';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/nutrition-definition-translations';

  constructor(protected http: HttpClient) {}

  create(nutritionDefinitionTranslation: INutritionDefinitionTranslation): Observable<EntityResponseType> {
    return this.http.post<INutritionDefinitionTranslation>(this.resourceUrl, nutritionDefinitionTranslation, { observe: 'response' });
  }

  update(nutritionDefinitionTranslation: INutritionDefinitionTranslation): Observable<EntityResponseType> {
    return this.http.put<INutritionDefinitionTranslation>(this.resourceUrl, nutritionDefinitionTranslation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INutritionDefinitionTranslation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INutritionDefinitionTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INutritionDefinitionTranslation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
