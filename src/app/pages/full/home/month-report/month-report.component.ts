import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.sass']
})
export class MonthReportComponent implements OnInit {


  title = 'ng2-charts-demo';

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
  };
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
