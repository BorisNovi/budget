import { Component } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import { ExpenceType } from '../../core/models/add.model';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  constructor(private localService: LocalService) {
    console.log('expences:', this.localService.get(ExpenceType.expence));
    console.log('incomes:', this.localService.get(ExpenceType.income));
  }
}
