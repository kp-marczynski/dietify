import { Routes } from '@angular/router';

import {
  auditsRoute,
  configurationRoute,
  docsRoute,
  healthRoute,
  logsRoute,
  metricsRoute,
  gatewayRoute,
  trackerRoute,
  userMgmtRoute
} from './';

import { UserRouteAccessService } from 'app/core';
import {dashboardRoute} from 'app/admin/dashboard/dashboard.route';

const ADMIN_ROUTES = [
  auditsRoute,
  configurationRoute,
  docsRoute,
  healthRoute,
  logsRoute,
  gatewayRoute,
  trackerRoute,
  ...userMgmtRoute,
  metricsRoute,
  dashboardRoute
];

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
