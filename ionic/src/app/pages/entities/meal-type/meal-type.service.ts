import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealType } from './meal-type.model';

@Injectable({ providedIn: 'root'})
export class MealTypeService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/meal-types';

    constructor(protected http: HttpClient) { }

    create(mealType: MealType): Observable<HttpResponse<MealType>> {
        return this.http.post<MealType>(this.resourceUrl, mealType, { observe: 'response'});
    }

    update(mealType: MealType): Observable<HttpResponse<MealType>> {
        return this.http.put(this.resourceUrl, mealType, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealType>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealType[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
