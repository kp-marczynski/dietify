import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealProduct } from './meal-product.model';

@Injectable({ providedIn: 'root'})
export class MealProductService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-products';

    constructor(protected http: HttpClient) { }

    create(mealProduct: MealProduct): Observable<HttpResponse<MealProduct>> {
        return this.http.post<MealProduct>(this.resourceUrl, mealProduct, { observe: 'response'});
    }

    update(mealProduct: MealProduct): Observable<HttpResponse<MealProduct>> {
        return this.http.put(this.resourceUrl, mealProduct, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealProduct>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
