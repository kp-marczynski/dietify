import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/layouts';

@Component({
    selector: 'jhi-admin-nav',
    templateUrl: './admin-nav.component.html',
    styles: []
})
export class AdminNavComponent implements OnInit {
    inProduction: boolean;
    swaggerEnabled: boolean;

    constructor(private profileService: ProfileService) {}

    ngOnInit() {
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }
}
