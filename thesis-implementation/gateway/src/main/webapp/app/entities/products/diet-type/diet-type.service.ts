import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDietType } from 'app/shared/model/products/diet-type.model';

type EntityResponseType = HttpResponse<IDietType>;
type EntityArrayResponseType = HttpResponse<IDietType[]>;

@Injectable({ providedIn: 'root' })
export class DietTypeService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/diet-types';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/diet-types';

  constructor(protected http: HttpClient) {}

  create(dietType: IDietType): Observable<EntityResponseType> {
    return this.http.post<IDietType>(this.resourceUrl, dietType, { observe: 'response' });
  }

  update(dietType: IDietType): Observable<EntityResponseType> {
    return this.http.put<IDietType>(this.resourceUrl, dietType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDietType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDietType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDietType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
