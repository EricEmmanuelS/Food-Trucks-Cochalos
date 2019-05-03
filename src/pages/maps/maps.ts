import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition  } from '@ionic-native/geolocation/ngx';

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  originPosition: string;
  destinationPosition: string;

  constructor(private geolocation: Geolocation) { }

  ionViewDidLoad() {
    this.initializeMap();
  }

  
  initializeMap() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.originPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.destinationPosition = -17.3339072 + "," + -66.2254597

      const mapOptions = {
        zoom: 18,
        center: this.originPosition
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
        position: this.originPosition,
        map: this.map
      });

    }).catch((error) => {
      console.log('Error al Recuperar la Posicion', error);
    });
  }

  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
      const request = {
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
}