import { Component, OnInit } from '@angular/core';
import {enter} from '../router.animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[enter]
})
export class HomeComponent implements OnInit {
 
  estado: boolean = false;
  es: string='';
  constructor() { }

  showspan(){
    this.estado = true;
  }
  showspan2(){
    this.estado = true;
  }
  ngOnInit() {
  }

}
