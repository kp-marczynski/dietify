import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { GatewaySharedModule } from 'app/shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
  adminState,
  AuditsComponent,
  UserMgmtComponent,
  UserMgmtDetailComponent,
  UserMgmtUpdateComponent,
  UserMgmtDeleteDialogComponent,
  LogsComponent,
  JhiMetricsMonitoringComponent,
  JhiHealthModalComponent,
  JhiHealthCheckComponent,
  JhiConfigurationComponent,
  JhiDocsComponent,
  JhiGatewayComponent,
  JhiTrackerComponent
} from './';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    GatewaySharedModule,
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild(adminState)
  ],
  declarations: [
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiConfigurationComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiDocsComponent,
    JhiGatewayComponent,
    JhiTrackerComponent,
    JhiMetricsMonitoringComponent,
    DashboardComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  entryComponents: [UserMgmtDeleteDialogComponent, JhiHealthModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAdminModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
