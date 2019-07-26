import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Meal } from './meal.model';

@Injectable({ providedIn: 'root'})
export class MealService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meals';

    constructor(protected http: HttpClient) { }

    create(meal: Meal): Observable<HttpResponse<Meal>> {
        return this.http.post<Meal>(this.resourceUrl, meal, { observe: 'response'});
    }

    update(meal: Meal): Observable<HttpResponse<Meal>> {
        return this.http.put(this.resourceUrl, meal, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Meal>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Meal[]>> {
        const options = createRequestOption(req);
        return this.http.get<Meal[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
