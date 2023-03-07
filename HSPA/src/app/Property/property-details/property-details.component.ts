import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { HousingService } from 'src/app/services/housing.service';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  public propertyId! : number;
  property = new Property();

galleryOptions!: NgxGalleryOptions[] ;
galleryImages!: NgxGalleryImage[] ;

  constructor(private activatedRoute:ActivatedRoute,
              private router : Router,
              private housingService : HousingService) { }

  ngOnInit() {
//Route-resolver not working for Rent properties , so commented

   // this.propertyId = Number( this.activatedRoute.snapshot.params['id']);

  //  this.propertyId = +this.activatedRoute.snapshot.params['id'];
  //   this.activatedRoute.data.subscribe((data) => {
  //     this.property = data['prp'];
  //   })





   this.activatedRoute.params.subscribe((params) => {
    this.propertyId = +params['id'];  //Number(params['id'])

  this.housingService.getProperty(this.propertyId).subscribe(
    (data : Property | undefined) => {
      if(data != undefined){
      this.property =  data;
      }
    }
  )
   });


    this.galleryOptions = [
      {
        width: '100%',
        height: '460px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // // max-width 800
      // {
      //   breakpoint: 800,
      //   width: '100%',
      //   height: '600px',
      //   imagePercent: 80,
      //   thumbnailsPercent: 20,
      //   thumbnailsMargin: 20,
      //   thumbnailMargin: 20
      // },
      // max-width 400
      // {
      //   breakpoint: 400,
      //   preview: false
      // }
    ];

    this.galleryImages = [
      {
        small: 'assets/Images/1-small.jpg',
        medium: 'assets/Images/1-small.jpg',
        big: 'assets/Images/1-small.jpg',
      },
      {
        small: 'assets/Images/2-small.jpg',
        medium: 'assets/Images/2-small.jpg',
        big: 'assets/Images/2-small.jpg',
      },
      {
        small: 'assets/Images/3-small.jpg',
        medium: 'assets/Images/3-small.jpg',
        big: 'assets/Images/3-small.jpg',
      },{
        small: 'assets/Images/4-small.webp',
        medium: 'assets/Images/4-small.webp',
        big: 'assets/Images/4-small.webp',
      }

    ];
  }
}


