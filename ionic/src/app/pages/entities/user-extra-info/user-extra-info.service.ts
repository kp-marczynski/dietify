import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { UserExtraInfo } from './user-extra-info.model';

@Injectable({ providedIn: 'root'})
export class UserExtraInfoService {
    private resourceUrl = ApiService.API_URL + '/user-extra-infos';

    constructor(protected http: HttpClient) { }

    create(userExtraInfo: UserExtraInfo): Observable<HttpResponse<UserExtraInfo>> {
        return this.http.post<UserExtraInfo>(this.resourceUrl, userExtraInfo, { observe: 'response'});
    }

    update(userExtraInfo: UserExtraInfo): Observable<HttpResponse<UserExtraInfo>> {
        return this.http.put(this.resourceUrl, userExtraInfo, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<UserExtraInfo>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<UserExtraInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserExtraInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
