import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/models/IPropertyBase';

@Component({
  selector: 'app-property-card',
  templateUrl:'property-card.component.html',
  styleUrls:['property-card.component.css'],
 // template : `<h1> i am a card</h1>`,
  styles:['h1 {font-weight : normal;}']
})

export class PropertyCardComponent  {
  @Input() Property! : IPropertyBase
  @Input() hideIcons : boolean | undefined;

}
