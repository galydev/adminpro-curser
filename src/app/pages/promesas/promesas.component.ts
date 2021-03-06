import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( users => {
    console.log(users);
    });
  }

  getUsuarios() {
    const promise = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( response => response.json() )
      .then( body => resolve(body.data))
    });

    return promise;
  }

}
