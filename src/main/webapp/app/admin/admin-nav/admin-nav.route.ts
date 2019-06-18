import { Route } from '@angular/router';
import { AdminNavComponent } from 'app/admin/admin-nav/admin-nav.component';

export const adminNavRoute: Route = {
    path: '',
    component: AdminNavComponent,
    data: {
        pageTitle: 'Administration'
    }
};
