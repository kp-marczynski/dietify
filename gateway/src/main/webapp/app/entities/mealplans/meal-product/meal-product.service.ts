import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';

type EntityResponseType = HttpResponse<IMealProduct>;
type EntityArrayResponseType = HttpResponse<IMealProduct[]>;

@Injectable({ providedIn: 'root' })
export class MealProductService {
  public resourceUrl = SERVER_API_URL + 'services/mealplans/api/meal-products';
  public resourceSearchUrl = SERVER_API_URL + 'services/mealplans/api/_search/meal-products';

  constructor(protected http: HttpClient) {}

  create(mealProduct: IMealProduct): Observable<EntityResponseType> {
    return this.http.post<IMealProduct>(this.resourceUrl, mealProduct, { observe: 'response' });
  }

  update(mealProduct: IMealProduct): Observable<EntityResponseType> {
    return this.http.put<IMealProduct>(this.resourceUrl, mealProduct, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMealProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealProduct[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
