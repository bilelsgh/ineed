import { ViewChild,ElementRef, Injectable } from '@angular/core';
import { AgmGeocoder, MapsAPILoader } from '@agm/core/';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { tap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';









@Injectable()

export class GeolocService  {
  
  info ={latitude: 0, longitude:0, };
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  google: any;
  obs:any;
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(private geocodeService: AgmGeocoder, private mapsAPILoader: MapsAPILoader){}



  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.info.latitude=position.coords.latitude;
        this.info.longitude=position.coords.longitude
      });
    }
  }
 
  getLatLong(address :string){
    const geocodeRequest = {
      address: address,
    };
    this.geoCoder=this.geocodeService.geocode(geocodeRequest)
    this.geoCoder
    .subscribe((result ) => {this.info.latitude=result[0].geometry.location.lat();
      this.info.longitude=result[0].geometry.location.lng();
    },
    (error)=>{
      console.log('Uh-oh, an error occurred! : ' + error);
    },
    () => {
      console.log('Observable complete!');
    }
    );
  
}
  
 

  

}