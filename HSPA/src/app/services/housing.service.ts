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

    getAllProperties(SellRent:number) : Observable<IPropertyBase[]>{
      return this.http.get<IPropertyBase[]>('data/Properties.json').pipe(
        map(data => {
          const propertiesArray:Array<IPropertyBase>  = [];

          //properties in data.json file
          for(const prop in data){
            if(data[prop].SellRent == SellRent){
              propertiesArray.push(data[prop]);
            }
          }
          let existingProperties = localStorage.getItem('newProperty');

          //properties in local storage

          if(existingProperties !== null){
            const loacalProperties = JSON.parse(existingProperties);

            for(const id in loacalProperties){
              if(loacalProperties.hasOwnProperty(id) && loacalProperties[id].SellRent == SellRent){
                propertiesArray.push(loacalProperties[id]);
              }
            }

          }
          return propertiesArray;
        })
      )
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
