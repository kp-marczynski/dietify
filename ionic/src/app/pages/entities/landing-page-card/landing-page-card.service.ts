import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { LandingPageCard } from './landing-page-card.model';

@Injectable({ providedIn: 'root'})
export class LandingPageCardService {
    private resourceUrl = ApiService.API_URL + '/landing-page-cards';

    constructor(protected http: HttpClient) { }

    create(landingPageCard: LandingPageCard): Observable<HttpResponse<LandingPageCard>> {
        return this.http.post<LandingPageCard>(this.resourceUrl, landingPageCard, { observe: 'response'});
    }

    update(landingPageCard: LandingPageCard): Observable<HttpResponse<LandingPageCard>> {
        return this.http.put(this.resourceUrl, landingPageCard, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<LandingPageCard>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<LandingPageCard[]>> {
        const options = createRequestOption(req);
        return this.http.get<LandingPageCard[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
