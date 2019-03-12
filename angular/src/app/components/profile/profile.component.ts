import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/models/price';
import {GROUPS} from './groups' 
declare let fc: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  priceEvolution: Price[] = fc.randomFinancial()(50);
  groups = GROUPS;

  constructor() { }

}