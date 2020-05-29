import { Component, OnInit, ViewChild,ElementRef,NgZone } from '@angular/core';
import{AgmCoreModule,MapsAPILoader} from '@agm/core';
import { google } from 'google-maps';
import { GeolocService } from '../services/geoloc.service';


@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.component.html',
  styleUrls: ['./geoloc.component.css']
})
export class GeolocComponent implements OnInit {
  info ={latitude: 0, longitude:0, zoom:13, address:"" };
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor( /*private geolocService:GeolocService,*/
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
    //load Places Autocomplete
    //this.geoCoder = new google.maps.Geocoder;
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder; }
    )}


      /*let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }*/

          //set latitude, longitude and zoom
          /*this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });*/


  // Get Current Location Coordinates
   setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 13;
        this.getAddress(this.latitude, this.longitude);
        this.info.latitude=position.coords.latitude;
        this.info.longitude=position.coords.longitude;
        this.info.zoom = 13;
        this.info.address=this.address;
      });
    }
  }
  getAddress(latitude, longitude) {

    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
