import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductPortion } from 'app/shared/model/product-portion.model';

type EntityResponseType = HttpResponse<IProductPortion>;
type EntityArrayResponseType = HttpResponse<IProductPortion[]>;

@Injectable({ providedIn: 'root' })
export class ProductPortionService {
    public resourceUrl = SERVER_API_URL + 'api/product-portions';

    constructor(protected http: HttpClient) {}

    create(productPortion: IProductPortion): Observable<EntityResponseType> {
        return this.http.post<IProductPortion>(this.resourceUrl, productPortion, { observe: 'response' });
    }

    update(productPortion: IProductPortion): Observable<EntityResponseType> {
        return this.http.put<IProductPortion>(this.resourceUrl, productPortion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductPortion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductPortion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
