import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ProductSubcategory } from './product-subcategory.model';

@Injectable({ providedIn: 'root'})
export class ProductSubcategoryService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/product-subcategories';

    constructor(protected http: HttpClient) { }

    create(productSubcategory: ProductSubcategory): Observable<HttpResponse<ProductSubcategory>> {
        return this.http.post<ProductSubcategory>(this.resourceUrl, productSubcategory, { observe: 'response'});
    }

    update(productSubcategory: ProductSubcategory): Observable<HttpResponse<ProductSubcategory>> {
        return this.http.put(this.resourceUrl, productSubcategory, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ProductSubcategory>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ProductSubcategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductSubcategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
