import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INutritionData } from 'app/shared/model/nutrition-data.model';

type EntityResponseType = HttpResponse<INutritionData>;
type EntityArrayResponseType = HttpResponse<INutritionData[]>;

@Injectable({ providedIn: 'root' })
export class NutritionDataService {
    public resourceUrl = SERVER_API_URL + 'api/nutrition-data';

    constructor(protected http: HttpClient) {}

    create(nutritionData: INutritionData): Observable<EntityResponseType> {
        return this.http.post<INutritionData>(this.resourceUrl, nutritionData, { observe: 'response' });
    }

    update(nutritionData: INutritionData): Observable<EntityResponseType> {
        return this.http.put<INutritionData>(this.resourceUrl, nutritionData, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INutritionData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INutritionData[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
