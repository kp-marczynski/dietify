import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { JhiConfigurationComponent } from 'app/admin';
import { PrivacyPolicyComponent } from 'app/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from 'app/terms-of-use/terms-of-use.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: './admin/admin.module#GatewayAdminModule'
        },
        {
          path: 'privacy-policy',
          component: PrivacyPolicyComponent,
          data: {
            pageTitle: 'global.menu.privacyPolicy'
          }
        },
        {
          path: 'terms-of-use',
          component: TermsOfUseComponent,
          data: {
            pageTitle: 'global.menu.termsOfUse'
          }
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class GatewayAppRoutingModule {}
