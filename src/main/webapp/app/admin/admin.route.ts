import { Routes } from '@angular/router';

import { docsRoute, userMgmtRoute } from './';

import { UserRouteAccessService } from 'app/core';
import { adminNavRoute } from 'app/admin/admin-nav/admin-nav.route';

const ADMIN_ROUTES = [adminNavRoute, docsRoute, ...userMgmtRoute];

export const adminState: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    }
];
