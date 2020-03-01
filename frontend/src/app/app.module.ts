import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    GraphQLModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoid2VjbGltYml0IiwiYSI6ImNrNzlha3B0YzA4aWgzbXJ6dDQ1ZXF4dWEifQ.NX6j-UOi0l9Ut3o-77FA4w',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
