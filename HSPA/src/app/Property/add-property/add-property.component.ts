import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/models/IProperty';
import { IPropertyBase } from 'src/app/models/IPropertyBase';
import { Property } from 'src/app/models/Property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {


  constructor(private fb:FormBuilder, private router : Router,private housingService:HousingService,
    private alertify:AlertifyService) { }

  property = new Property();

  @ViewChild('formTabs') formTabs?: TabsetComponent;

  addPropertyForm!: FormGroup;
  nextClicked : boolean = false;
  //will come from masters
  propertTypes:Array<string> = ['House','Apartment','Duplex'];
  furnishedTypes:Array<string> = ['Fully','Semi','Unfurnished'];

  propertyView : IPropertyBase = {
    Id: 0,
    Name: '',
    Price: null,
    SellRent: 1,
    PType: null,

    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null

  };

  Name : string='';
  Type : string='';
  price : number = 0;





  ngOnInit() {
    this.CreateAddPropertyForm();
    //console.log(this.addPropertyForm.get('BasicInfo.SellRent')?.value); // check the value of SellRent control
    console.log(this.addPropertyForm.value);
   // this.addPropertyForm.get('BasicInfo.SellRent')?.setValue(1);
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo : this.fb.group({
          SellRent : ['1',Validators.required],
          BHK : [null,Validators.required],
          PType : [null,Validators.required],
          FType : [null,Validators.required],
          Name :  [null,Validators.required],
          City :  [null,Validators.required]
        }),
      PriceInfo : this.fb.group({
        Price : [null,Validators.required],
        BuiltArea : [null,Validators.required],
        CarpetArea : [null],
        Security : [null],
        Maintainance : [null]

      }),
      AddressInfo : this.fb.group({
        FloorNo : [null],
        TotalFloor : [null],
        Address : [null,Validators.required],
        LandMark : [null]
      }),
      OtherInfo : this.fb.group({
        RTM:[null,Validators.required],
        Possession:[null],
        AOP:[null],
        Gated:[null],
        MainEntrance:[null],
        Description : [null]

      })
    });
  }



  //----------------------------------------
  //Getter Methods
  //----------------------------------------

  //#region <Getter Methods>
  //#region <FormGroups>

  get BasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo(){
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo(){
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  //#endregion

  //#region <FormControls>
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }
  get IsNameValid(){
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get PropertyType(){
    return this.BasicInfo.controls['PType'] as FormControl;
  }


  get Price(){
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BHK(){
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get FType(){
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get City(){
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get BuiltArea(){
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea(){
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Address(){
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get RTM(){
    return this.OtherInfo.controls['RTM'] as FormControl;
  }


  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }


  get Maintainance() {
    return this.PriceInfo.controls['Maintainance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }



  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }



  get Possession() {
    return this.OtherInfo.controls['Possession'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

//#endregion

//#endregion
  onSubmit(){
    console.log(this.addPropertyForm.value);

    this.nextClicked = true;

    if(this.allTabsValid()){
      //calling mapProperty method to load user entered values into property class
      this.mapProperty();

      //passing that loaded property class to addProperty service
      this.housingService.addProperty(this.property)
      this.alertify.success('Congrats, your property added successfully');
      console.log(this.addPropertyForm);
      if(this.SellRent.value === '2'){
        this.router.navigate(['/rent-property']);
      }
      else{
        this.router.navigate(['/']);
      }
    }
    else{
      this.alertify.error('please review the form and provide required entries');
    }
    // console.log(formValue);
  }

  mapProperty() : void{
    this.property.Id = this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PropertyType.value;
    this.property.Name = this.IsNameValid.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintainance = this.Maintainance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.Possession.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid() : boolean{
    if(this.BasicInfo.invalid && this.formTabs){
      this.formTabs.tabs[0].active = true;
      return false;
    }
    else  if(this.PriceInfo.invalid && this.formTabs){
      this.formTabs.tabs[1].active = true;
      return false;
    }

    else  if(this.AddressInfo.invalid && this.formTabs){
      this.formTabs.tabs[2].active = true;
      return false;
    }

    else  if(this.OtherInfo.invalid && this.formTabs){
      this.formTabs.tabs[3].active = true;
      return false;
    }
    else{
      return true;
    }
  }
  Back(){
    this.router.navigate(['/'])
  }

  selectTab(tabId: number,IsTabValid : boolean) {
    this.nextClicked = true;
    if (this.formTabs?.tabs[tabId] && IsTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
