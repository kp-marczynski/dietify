import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

type EntityResponseType = HttpResponse<IProductCategoryTranslation>;
type EntityArrayResponseType = HttpResponse<IProductCategoryTranslation[]>;

@Injectable({ providedIn: 'root' })
export class ProductCategoryTranslationService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/product-category-translations';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/product-category-translations';

  constructor(protected http: HttpClient) {}

  create(productCategoryTranslation: IProductCategoryTranslation): Observable<EntityResponseType> {
    return this.http.post<IProductCategoryTranslation>(this.resourceUrl, productCategoryTranslation, { observe: 'response' });
  }

  update(productCategoryTranslation: IProductCategoryTranslation): Observable<EntityResponseType> {
    return this.http.put<IProductCategoryTranslation>(this.resourceUrl, productCategoryTranslation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductCategoryTranslation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductCategoryTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductCategoryTranslation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
