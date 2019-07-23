import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';

type EntityResponseType = HttpResponse<IProductSubcategory>;
type EntityArrayResponseType = HttpResponse<IProductSubcategory[]>;

@Injectable({ providedIn: 'root' })
export class ProductSubcategoryService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/product-subcategories';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/product-subcategories';

  constructor(protected http: HttpClient) {}

  create(productSubcategory: IProductSubcategory): Observable<EntityResponseType> {
    return this.http.post<IProductSubcategory>(this.resourceUrl, productSubcategory, { observe: 'response' });
  }

  update(productSubcategory: IProductSubcategory): Observable<EntityResponseType> {
    return this.http.put<IProductSubcategory>(this.resourceUrl, productSubcategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductSubcategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductSubcategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductSubcategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
