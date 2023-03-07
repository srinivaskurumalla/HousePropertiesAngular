import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../models/IPropertyBase';
import { Property } from '../models/Property';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) {}

  getProperty(id:number){
   return this.getAllProperties().pipe(
      map(propertiesArray => {
        //throw new Error('some error');
        return propertiesArray.find(p => p.Id == id);
      })
    )
  }

    getAllProperties(SellRent?:number) : Observable<Property[]>{
      return this.http.get<Property[]>('data/Properties.json').pipe(
        map(data => {
          const propertiesArray:Array<Property>  = [];


          //properties in data.json file
          for(const prop in data){
            if(SellRent){
            if(data[prop].SellRent == SellRent){
              propertiesArray.push(data[prop]);
            }
          }
          else{
            propertiesArray.push(data[prop]);

          }
          }
          let existingProperties = localStorage.getItem('newProperty');

          //properties in local storage

          if(existingProperties !== null){
            const loacalProperties = JSON.parse(existingProperties);

            for(const id in loacalProperties){
              if(SellRent){
              if(loacalProperties.hasOwnProperty(id) && loacalProperties[id].SellRent == SellRent){
                propertiesArray.push(loacalProperties[id]);
              }
            }
            else{
              propertiesArray.push(loacalProperties[id]);

            }
            }

          }
          return propertiesArray;
        })
      );
     // return this.http.get<Property[]>('data/properties.json');
    }

    // addProperty(property:Property){
    //   localStorage.setItem('newProperty',JSON.stringify(property));
    // }



    addProperty(property: Property) {
      let properties = [property];
      const existingProperties = localStorage.getItem('newProperty');
      if (existingProperties) {
        try {
          const parsedProperties = JSON.parse(existingProperties);
          if (Array.isArray(parsedProperties)) {
            properties = [property, ...parsedProperties];
            console.log('property added');
          }
        } catch (error) {
          console.error(error);
        }
      }
      localStorage.setItem('newProperty', JSON.stringify(properties));
    }



    newPropId() : number{
      let propId = localStorage.getItem('propId');
     if(propId){
       localStorage.setItem('propId',String(+propId+1 ));
       return Number( localStorage.getItem('propId')) ;

     }
     else{
      localStorage.setItem('propId','101');
      return 101 ;
     }
    }
}
