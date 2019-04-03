import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealType } from 'app/shared/model/meal-type.model';

type EntityResponseType = HttpResponse<IMealType>;
type EntityArrayResponseType = HttpResponse<IMealType[]>;

@Injectable({ providedIn: 'root' })
export class MealTypeService {
    public resourceUrl = SERVER_API_URL + 'api/meal-types';

    constructor(protected http: HttpClient) {}

    create(mealType: IMealType): Observable<EntityResponseType> {
        return this.http.post<IMealType>(this.resourceUrl, mealType, { observe: 'response' });
    }

    update(mealType: IMealType): Observable<EntityResponseType> {
        return this.http.put<IMealType>(this.resourceUrl, mealType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMealType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMealType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
