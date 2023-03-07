import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { PropertyDetailsResolverService } from './Property/property-details/property-details-resolver.service';
import { PropertyDetailsComponent } from './Property/property-details/property-details.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import { UserLoginComponent } from './User/UserLogin/userLogin/userLogin.component';
import { UserRegistrationComponent } from './User/UserRegistration/UserRegistration/UserRegistration.component';

const routes: Routes = [
  {path:'',component:PropertyListComponent},
  {path:'rent-property',component:PropertyListComponent},
  {path:'add-property',component:AddPropertyComponent},
  {path:'property-details/:id',
                              component:PropertyDetailsComponent,
                              resolve : {prp : PropertyDetailsResolverService}},
  {path:'rent-property/property-details/:id',component:PropertyDetailsComponent},
  {path:'user/login',component:UserLoginComponent},
  {path:'user/register',component:UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
