import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Language } from 'app/shared/model/language.model';
import { LanguageService } from './language.service';
import { LanguageComponent } from './language.component';
import { LanguageDetailComponent } from './language-detail.component';
import { LanguageUpdateComponent } from './language-update.component';
import { LanguageDeletePopupComponent } from './language-delete-dialog.component';
import { ILanguage } from 'app/shared/model/language.model';

@Injectable({ providedIn: 'root' })
export class LanguageResolve implements Resolve<ILanguage> {
    constructor(private service: LanguageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILanguage> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Language>) => response.ok),
                map((language: HttpResponse<Language>) => language.body)
            );
        }
        return of(new Language());
    }
}

export const languageRoute: Routes = [
    {
        path: '',
        component: LanguageComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Languages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LanguageDetailComponent,
        resolve: {
            language: LanguageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Languages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LanguageUpdateComponent,
        resolve: {
            language: LanguageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Languages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LanguageUpdateComponent,
        resolve: {
            language: LanguageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Languages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const languagePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LanguageDeletePopupComponent,
        resolve: {
            language: LanguageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Languages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
