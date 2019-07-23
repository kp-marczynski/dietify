import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';

type EntityResponseType = HttpResponse<IDishTypeTranslation>;
type EntityArrayResponseType = HttpResponse<IDishTypeTranslation[]>;

@Injectable({ providedIn: 'root' })
export class DishTypeTranslationService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/dish-type-translations';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/dish-type-translations';

  constructor(protected http: HttpClient) {}

  create(dishTypeTranslation: IDishTypeTranslation): Observable<EntityResponseType> {
    return this.http.post<IDishTypeTranslation>(this.resourceUrl, dishTypeTranslation, { observe: 'response' });
  }

  update(dishTypeTranslation: IDishTypeTranslation): Observable<EntityResponseType> {
    return this.http.put<IDishTypeTranslation>(this.resourceUrl, dishTypeTranslation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDishTypeTranslation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDishTypeTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDishTypeTranslation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
