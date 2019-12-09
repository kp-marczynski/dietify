import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

type EntityResponseType = HttpResponse<IDietTypeTranslation>;
type EntityArrayResponseType = HttpResponse<IDietTypeTranslation[]>;

@Injectable({ providedIn: 'root' })
export class DietTypeTranslationService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/diet-type-translations';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/diet-type-translations';

  constructor(protected http: HttpClient) {}

  create(dietTypeTranslation: IDietTypeTranslation): Observable<EntityResponseType> {
    return this.http.post<IDietTypeTranslation>(this.resourceUrl, dietTypeTranslation, { observe: 'response' });
  }

  update(dietTypeTranslation: IDietTypeTranslation): Observable<EntityResponseType> {
    return this.http.put<IDietTypeTranslation>(this.resourceUrl, dietTypeTranslation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDietTypeTranslation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDietTypeTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDietTypeTranslation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
