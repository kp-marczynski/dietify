import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/layouts';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  swaggerEnabled: boolean;
  inProduction: boolean;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }
}
