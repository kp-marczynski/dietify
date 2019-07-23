import { NgModule } from '@angular/core';

import { DietifySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DietifySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [DietifySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DietifySharedCommonModule {}
