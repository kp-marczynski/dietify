import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ProductCategoryTranslation } from './product-category-translation.model';

@Injectable({ providedIn: 'root'})
export class ProductCategoryTranslationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/product-category-translations';

    constructor(protected http: HttpClient) { }

    create(productCategoryTranslation: ProductCategoryTranslation): Observable<HttpResponse<ProductCategoryTranslation>> {
        return this.http.post<ProductCategoryTranslation>(this.resourceUrl, productCategoryTranslation, { observe: 'response'});
    }

    update(productCategoryTranslation: ProductCategoryTranslation): Observable<HttpResponse<ProductCategoryTranslation>> {
        return this.http.put(this.resourceUrl, productCategoryTranslation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ProductCategoryTranslation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ProductCategoryTranslation[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductCategoryTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
