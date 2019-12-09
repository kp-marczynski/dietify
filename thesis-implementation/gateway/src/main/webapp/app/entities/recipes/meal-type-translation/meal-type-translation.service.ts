import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

type EntityResponseType = HttpResponse<IMealTypeTranslation>;
type EntityArrayResponseType = HttpResponse<IMealTypeTranslation[]>;

@Injectable({ providedIn: 'root' })
export class MealTypeTranslationService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/meal-type-translations';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/meal-type-translations';

  constructor(protected http: HttpClient) {}

  create(mealTypeTranslation: IMealTypeTranslation): Observable<EntityResponseType> {
    return this.http.post<IMealTypeTranslation>(this.resourceUrl, mealTypeTranslation, { observe: 'response' });
  }

  update(mealTypeTranslation: IMealTypeTranslation): Observable<EntityResponseType> {
    return this.http.put<IMealTypeTranslation>(this.resourceUrl, mealTypeTranslation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMealTypeTranslation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealTypeTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealTypeTranslation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
