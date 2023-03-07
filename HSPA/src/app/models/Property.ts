import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase{
  Id!: number;
  SellRent: number | null = null;
  Name: string | null = null;
  PType!: string ;
  FType!: string ;
  Price!: number ;
  BHK!: number ;
  BuiltArea!: number ;
  City: string | null = null;
  RTM!: number ;
  Image?: string | undefined;

  CarpetArea? : string;
  Address! : string;
  Address2? : string;
  FloorNo? : string;
  TotalFloor? : string;
  AOP? : string;
  Maintainance? : string;
  MainEntrance? : string;
  Security? : string;
  Gated? : string;
  Possession? : string;
  Description? : string;
  PostedOn : string | null=null;
  PostedBy : number | null = null;
}
