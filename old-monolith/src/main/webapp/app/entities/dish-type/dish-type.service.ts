import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDishType } from 'app/shared/model/dish-type.model';

type EntityResponseType = HttpResponse<IDishType>;
type EntityArrayResponseType = HttpResponse<IDishType[]>;

@Injectable({ providedIn: 'root' })
export class DishTypeService {
    public resourceUrl = SERVER_API_URL + 'api/dish-types';

    constructor(protected http: HttpClient) {}

    create(dishType: IDishType): Observable<EntityResponseType> {
        return this.http.post<IDishType>(this.resourceUrl, dishType, { observe: 'response' });
    }

    update(dishType: IDishType): Observable<EntityResponseType> {
        return this.http.put<IDishType>(this.resourceUrl, dishType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDishType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDishType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
