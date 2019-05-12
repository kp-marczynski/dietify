import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared';
import {IProduct} from 'app/shared/model/product.model';
import {BasicNutritionRequest} from 'app/shared/model/basic-nutrition-request.model';
import {BasicNutritionResponse, IBasicNutritionResponse} from 'app/shared/model/basic-nutrition-response.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

type NutritionResponseType = HttpResponse<BasicNutritionResponse>;

@Injectable({providedIn: 'root'})
export class ProductService {
    public resourceUrl = SERVER_API_URL + 'api/products';

    constructor(protected http: HttpClient) {
    }

    create(product: IProduct): Observable<EntityResponseType> {
        return this.http.post<IProduct>(this.resourceUrl, product, {observe: 'response'});
    }

    update(product: IProduct): Observable<EntityResponseType> {
        return this.http.put<IProduct>(this.resourceUrl, product, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProduct[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    // getBasicNutrtions(productId: number, houseHoldMeasureId: number): Observable<EntityResponseType> {
    //     return this.http.get<IProduct>(`${this.resourceUrl}/${productId}/basic-nutritions?houseHoldMeasureId=${houseHoldMeasureId}`, {observe: 'response'});
    // }

    getBasicNutrtions(basicNutritionRequests: BasicNutritionRequest[]): Observable<NutritionResponseType> {
        return this.http.post<IBasicNutritionResponse>(`${this.resourceUrl}/basic-nutritions`, basicNutritionRequests, {observe: 'response'});
    }
}
