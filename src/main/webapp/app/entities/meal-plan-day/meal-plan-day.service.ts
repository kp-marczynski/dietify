import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealPlanDay } from 'app/shared/model/meal-plan-day.model';

type EntityResponseType = HttpResponse<IMealPlanDay>;
type EntityArrayResponseType = HttpResponse<IMealPlanDay[]>;

@Injectable({ providedIn: 'root' })
export class MealPlanDayService {
    public resourceUrl = SERVER_API_URL + 'api/meal-plan-days';

    constructor(protected http: HttpClient) {}

    create(mealPlanDay: IMealPlanDay): Observable<EntityResponseType> {
        return this.http.post<IMealPlanDay>(this.resourceUrl, mealPlanDay, { observe: 'response' });
    }

    update(mealPlanDay: IMealPlanDay): Observable<EntityResponseType> {
        return this.http.put<IMealPlanDay>(this.resourceUrl, mealPlanDay, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMealPlanDay>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMealPlanDay[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
