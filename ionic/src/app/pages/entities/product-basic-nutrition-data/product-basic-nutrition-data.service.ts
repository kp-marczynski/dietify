import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ProductBasicNutritionData } from './product-basic-nutrition-data.model';

@Injectable({ providedIn: 'root'})
export class ProductBasicNutritionDataService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/product-basic-nutrition-data';

    constructor(protected http: HttpClient) { }

    create(productBasicNutritionData: ProductBasicNutritionData): Observable<HttpResponse<ProductBasicNutritionData>> {
        return this.http.post<ProductBasicNutritionData>(this.resourceUrl, productBasicNutritionData, { observe: 'response'});
    }

    update(productBasicNutritionData: ProductBasicNutritionData): Observable<HttpResponse<ProductBasicNutritionData>> {
        return this.http.put(this.resourceUrl, productBasicNutritionData, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ProductBasicNutritionData>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ProductBasicNutritionData[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductBasicNutritionData[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
