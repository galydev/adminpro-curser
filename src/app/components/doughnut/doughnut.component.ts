import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

   public colors:Color[] = [
     { backgroundColor: ['#3399FF','#FF5800','#FFB414']}
   ];

   @Input() title: string = "Sin Titulo";
   @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'label2', 'label3'];
   @Input('data') doughnutChartData : MultiDataSet = [
      [350, 450, 100],
    ];

}
