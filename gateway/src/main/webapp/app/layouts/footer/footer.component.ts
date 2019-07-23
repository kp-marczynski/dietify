import { Component } from '@angular/core';
import { VERSION } from 'app/app.constants';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  version: string;
  currentYear: any;

  constructor() {
    this.version = VERSION ? 'v' + VERSION : '';
    this.currentYear = new Date().getFullYear();
  }
}
