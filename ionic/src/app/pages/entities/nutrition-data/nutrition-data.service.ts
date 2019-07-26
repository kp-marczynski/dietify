import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { NutritionData } from './nutrition-data.model';

@Injectable({ providedIn: 'root'})
export class NutritionDataService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/nutrition-data';

    constructor(protected http: HttpClient) { }

    create(nutritionData: NutritionData): Observable<HttpResponse<NutritionData>> {
        return this.http.post<NutritionData>(this.resourceUrl, nutritionData, { observe: 'response'});
    }

    update(nutritionData: NutritionData): Observable<HttpResponse<NutritionData>> {
        return this.http.put(this.resourceUrl, nutritionData, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<NutritionData>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<NutritionData[]>> {
        const options = createRequestOption(req);
        return this.http.get<NutritionData[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
