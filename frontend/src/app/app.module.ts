import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MomentModule } from 'ngx-moment';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailCardComponent } from './components/detail-card/detail-card.component';
import { DetailNearbyComponent } from './components/detail-card/detail-nearby/detail-nearby.component';
import { CompetitionCardItemComponent } from './components/detail-card/items/competition-item.component';
import { CragCardItemComponent } from './components/detail-card/items/crag-item.component';
import { HikeCardItemComponent } from './components/detail-card/items/hike-item.component';
import { PlaceCardItemComponent } from './components/detail-card/items/place-item.component';
import { ShelterCardItemComponent } from './components/detail-card/items/shelter-item.component';
import { HeaderComponent } from './components/header/header.component';
import { CompetitionListItemComponent } from './components/list-items/competition-item.component';
import { CragListItemComponent } from './components/list-items/crag-item.component';
import { HikeListItemComponent } from './components/list-items/hike-item.component';
import { PlaceListItemComponent } from './components/list-items/place-item.component';
import { ShelterListItemComponent } from './components/list-items/shelter-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MapComponent } from './components/map/map.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SkyconComponent } from './components/skycon/skycon.component';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material.module';
import { DetailComponent } from './pages/detail/detail.component';
import { EntitiesListComponent } from './pages/entities-list/entities-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CapitalizeFirstPipe } from './pipes/capitalizeFirst/capitalize-first.pipe';
import { DistancePipe } from './pipes/distance/distance.pipe';
import { MetricPipe } from './pipes/metric/metric.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const pipes = [DistancePipe, CapitalizeFirstPipe, MetricPipe];
const appComponents = [
  AppComponent,
  MapComponent,
  HeaderComponent,
  SidebarComponent,
  NotFoundComponent,
  EntitiesListComponent,
  DetailComponent,
  CragListItemComponent,
  HikeListItemComponent,
  ShelterListItemComponent,
  PlaceListItemComponent,
  CompetitionListItemComponent,
  CragCardItemComponent,
  HikeCardItemComponent,
  ShelterCardItemComponent,
  PlaceCardItemComponent,
  CompetitionCardItemComponent,
  MediaPlayerComponent,
  LoaderComponent,
  DetailCardComponent,
  SkyconComponent,
  DetailNearbyComponent,
];

@NgModule({
  declarations: [...pipes, ...appComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    GraphQLModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    PerfectScrollbarModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.token,
    }),
    MomentModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
