import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';

type EntityResponseType = HttpResponse<IProductBasicNutritionData>;
type EntityArrayResponseType = HttpResponse<IProductBasicNutritionData[]>;

@Injectable({ providedIn: 'root' })
export class ProductBasicNutritionDataService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/product-basic-nutrition-data';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/product-basic-nutrition-data';

  constructor(protected http: HttpClient) {}

  create(productBasicNutritionData: IProductBasicNutritionData): Observable<EntityResponseType> {
    return this.http.post<IProductBasicNutritionData>(this.resourceUrl, productBasicNutritionData, { observe: 'response' });
  }

  update(productBasicNutritionData: IProductBasicNutritionData): Observable<EntityResponseType> {
    return this.http.put<IProductBasicNutritionData>(this.resourceUrl, productBasicNutritionData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductBasicNutritionData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductBasicNutritionData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductBasicNutritionData[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
