import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDietetician } from 'app/shared/model/dietetician.model';

type EntityResponseType = HttpResponse<IDietetician>;
type EntityArrayResponseType = HttpResponse<IDietetician[]>;

@Injectable({ providedIn: 'root' })
export class DieteticianService {
    public resourceUrl = SERVER_API_URL + 'api/dieteticians';

    constructor(protected http: HttpClient) {}

    create(dietetician: IDietetician): Observable<EntityResponseType> {
        return this.http.post<IDietetician>(this.resourceUrl, dietetician, { observe: 'response' });
    }

    update(dietetician: IDietetician): Observable<EntityResponseType> {
        return this.http.put<IDietetician>(this.resourceUrl, dietetician, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDietetician>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDietetician[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
