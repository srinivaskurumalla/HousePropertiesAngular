import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve,  Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Property } from 'src/app/models/Property';
import { HousingService } from 'src/app/services/housing.service';
import { catchError, map } from 'rxjs/operators'; // Import the map operator


@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsResolverService implements Resolve<Property>{

constructor(private router : Router,private housingService : HousingService) { }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {
    const propId  = route.params['id'];


      return this.housingService.getProperty(propId).pipe(

        catchError((err) => {
          this.router.navigate(['/']);
         // return of(null);
         console.log(err);
         return of(null);
        }),
        map(property => {
          if(property){
            return property;
          }
          else{
            // handle the case where the property is not found
          throw new Error('Property not found');
          }
        })
      )



  }

}
