import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ProductPortion } from './product-portion.model';

@Injectable({ providedIn: 'root'})
export class ProductPortionService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/product-portions';

    constructor(protected http: HttpClient) { }

    create(productPortion: ProductPortion): Observable<HttpResponse<ProductPortion>> {
        return this.http.post<ProductPortion>(this.resourceUrl, productPortion, { observe: 'response'});
    }

    update(productPortion: ProductPortion): Observable<HttpResponse<ProductPortion>> {
        return this.http.put(this.resourceUrl, productPortion, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ProductPortion>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ProductPortion[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductPortion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
