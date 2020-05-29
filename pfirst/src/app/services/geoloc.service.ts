import { ViewChild,ElementRef, Injectable } from '@angular/core';
import { AgmGeocoder, MapsAPILoader, GeocoderRequest} from '@agm/core/';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { tap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';









@Injectable()

export class GeolocService  {

  info ={latitude: 0, longitude:0,city:"" };
  google: any;
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(private geocodeService: AgmGeocoder, private mapsAPILoader: MapsAPILoader){}



  setCurrentLocation() {
    //if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.info.latitude=position.coords.latitude;
        this.info.longitude=position.coords.longitude;
        this.geoCoder = new google.maps.Geocoder;
        this.geoCoder.geocode({ 'location': { lat: this.info.latitude, lng: this.info.longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              const adrr = results[5].formatted_address;
              
              console.log(adrr.split(",")[0])
              
            }}

        });

      },
      (eror)=> {},
       {timeout:10000});

  }


  getLatLong(address :string){
    return new Promise((resolve,reject)=>{
    const geocodeRequest = {
      address: address,
    };
    this.geoCoder=this.geocodeService.geocode(geocodeRequest)
    this.geoCoder
    .subscribe((result ) => {this.info.latitude=result[0].geometry.location.lat();
      this.info.longitude=result[0].geometry.location.lng();
      resolve(true);
    },
    (error)=>{
      reject(true);
    },
    () => {
    }
    );
  });

}





}
