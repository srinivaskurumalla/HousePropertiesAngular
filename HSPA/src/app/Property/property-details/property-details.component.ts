import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  public propertyId! : number;
  constructor(private activatedRoute:ActivatedRoute,private router : Router) { }

  ngOnInit() {
   // this.propertyId = Number( this.activatedRoute.snapshot.params['id']);

   this.activatedRoute.params.subscribe(params => [
    this.propertyId = +params['id']  //Number(params['id'])
   ]);
  }
  NextProperty(){
    this.propertyId += 1;

    this.router.navigate(['property-details',this.propertyId])
  }
}
