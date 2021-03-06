import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  public label1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
     [350, 450, 100],
  ];

  public label3: string[] = ['Compras1', 'Compras2', 'Compras3'];
  public data3 = [
     [350, 450, 100],
  ];

}
