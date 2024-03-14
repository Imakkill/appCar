import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carro-component',
  templateUrl: './carro-component.component.html',
  styleUrls: ['./carro-component.component.scss'],
})
export class CarroComponentComponent  implements OnInit {
  @Input() carro:any
  constructor() { }

  ngOnInit() {}

}
