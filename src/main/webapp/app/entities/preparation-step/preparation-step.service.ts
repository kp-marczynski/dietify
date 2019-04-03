import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPreparationStep } from 'app/shared/model/preparation-step.model';

type EntityResponseType = HttpResponse<IPreparationStep>;
type EntityArrayResponseType = HttpResponse<IPreparationStep[]>;

@Injectable({ providedIn: 'root' })
export class PreparationStepService {
    public resourceUrl = SERVER_API_URL + 'api/preparation-steps';

    constructor(protected http: HttpClient) {}

    create(preparationStep: IPreparationStep): Observable<EntityResponseType> {
        return this.http.post<IPreparationStep>(this.resourceUrl, preparationStep, { observe: 'response' });
    }

    update(preparationStep: IPreparationStep): Observable<EntityResponseType> {
        return this.http.put<IPreparationStep>(this.resourceUrl, preparationStep, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPreparationStep>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPreparationStep[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
