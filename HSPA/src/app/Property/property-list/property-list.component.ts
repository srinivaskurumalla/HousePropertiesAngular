import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/models/IPropertyBase';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit{

  Properties: Array<IPropertyBase> = [];
  SellRent = 1;
  constructor(private activatedRoute:ActivatedRoute, private housingService:HousingService){}
  ngOnInit(): void {

    if(this.activatedRoute.snapshot.url.toString()){
      this.SellRent=2; //if we have url, it means we are in rent-property
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(data =>{
      this.Properties = data;
      //getting stored property
      const newProperty = localStorage.getItem('newProperty');
      if (newProperty !== null) {
        const parsedProperty =  JSON.parse(newProperty) as IPropertyBase;
        if(parsedProperty.SellRent === this.SellRent){
          this.Properties = [parsedProperty, ...this.Properties];
        }
      }



      console.log(data);
      console.log(this.activatedRoute.snapshot.url.toString());
    },
    error => {
      console.log(error);
    }
    )

  }
}
