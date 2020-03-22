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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material.module';
import { DetailComponent } from './pages/detail/detail.component';
import { EntitiesListComponent } from './pages/entities-list/entities-list.component';
import { CompetitionListItemComponent } from './pages/entities-list/items/competition-item.component';
import { CragListItemComponent } from './pages/entities-list/items/crag-item.component';
import { HikeListItemComponent } from './pages/entities-list/items/hike-item.component';
import { PlaceListItemComponent } from './pages/entities-list/items/place-item.component';
import { ShelterListItemComponent } from './pages/entities-list/items/shelter-item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { CapitalizeFirstPipe } from './pipes/capitalizeFirst/capitalize-first.pipe';
import { DistancePipe } from './pipes/distance/distance.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const pipes = [DistancePipe, CapitalizeFirstPipe];

@NgModule({
  declarations: [
    ...pipes,
    AppComponent,
    MapComponent,
    HeaderComponent,
    SidebarComponent,
    NotFoundComponent,
    EntitiesListComponent,
    SearchResultsComponent,
    DetailComponent,
    CragListItemComponent,
    HikeListItemComponent,
    ShelterListItemComponent,
    PlaceListItemComponent,
    CompetitionListItemComponent,
  ],
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
      accessToken: 'pk.eyJ1Ijoid2VjbGltYml0IiwiYSI6ImNrNzlha3B0YzA4aWgzbXJ6dDQ1ZXF4dWEifQ.NX6j-UOi0l9Ut3o-77FA4w',
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
