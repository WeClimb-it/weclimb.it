import { Component, OnInit } from '@angular/core';
import { GeoLocation } from './classes/geolocation.class';
import { NearbyResult, UserInfoResult } from './graphql/queries';
import { MapUpdateEvent } from './interfaces/events/map-update.interface';
import { SearchResult } from './interfaces/graphql/searchresult.type';
import { UserInfo } from './interfaces/graphql/userinfo.type';
import { WciApiService } from './services/wci-api.service';

@Component({
  selector: 'wci-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  zoom = 9;
  currentLocation: GeoLocation = new GeoLocation(0, 0);
  userLocation: GeoLocation;
  nearbyPois: SearchResult;

  private mapData: MapUpdateEvent;
  private userData: UserInfo;

  constructor(private api: WciApiService) {}

  ngOnInit(): void {
    this.bootstrap();
  }

  /**
   *
   */
  onMapReady($event: MapUpdateEvent): void {
    this.mapData = $event;
  }

  /**
   *
   */
  onMapUpdate($event: MapUpdateEvent): void {
    this.mapData = $event;

    // Something changed in the map, let's retrieve the new data
    const nearbySubscription = this.api
      .getNearby({
        lng: this.mapData.coordinates[0],
        lat: this.mapData.coordinates[1],
        minWeather: 0,
        maxWeather: 1,
        minPosition: 0,
        maxPosition: 1,
        minDifficulty: 0,
        maxDifficulty: 1,
        distance: this.mapData.radius,
      })
      .subscribe((res: NearbyResult) => {
        if (res.errors) {
          throw new Error('Something went wrong during the nearby query');
        }

        if (!res.loading) {
          this.nearbyPois = res.data.nearby;
          nearbySubscription.unsubscribe();
        }
      });
  }

  /**
   *
   */
  private bootstrap(): void {
    // First, let's retrieve some information about the user
    const userInfoSubscription = this.api.getUserInfo().subscribe((res: UserInfoResult) => {
      if (res.errors) {
        throw new Error('Something wrong happened loading the user info');
      }

      if (!res.loading) {
        this.userData = res.data.userInfo;
        // We set the user location as current one so the map is updated (it will trigger the "onMapUpdate" event)
        this.currentLocation = new GeoLocation(this.userData.geo.coords.lat, this.userData.geo.coords.lng);
        this.userLocation = this.currentLocation;
        userInfoSubscription.unsubscribe();
      }
    });
  }
}
