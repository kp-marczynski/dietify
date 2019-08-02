import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealPlanDay } from './meal-plan-day.model';

@Injectable({ providedIn: 'root'})
export class MealPlanDayService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-plan-days';

    constructor(protected http: HttpClient) { }

    create(mealPlanDay: MealPlanDay): Observable<HttpResponse<MealPlanDay>> {
        return this.http.post<MealPlanDay>(this.resourceUrl, mealPlanDay, { observe: 'response'});
    }

    update(mealPlanDay: MealPlanDay): Observable<HttpResponse<MealPlanDay>> {
        return this.http.put(this.resourceUrl, mealPlanDay, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealPlanDay>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealPlanDay[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealPlanDay[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
