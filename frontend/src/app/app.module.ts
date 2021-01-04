import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { SharedModule } from './components/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PipesModule } from './pipes/pipes.module';
import { I18nService } from './services/i18n.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const appComponents = [
  AppComponent,
  MapComponent,
  HeaderComponent,
  SidebarComponent,
  NotFoundComponent,
  MediaPlayerComponent,
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export function appInitializerFactory(translateService: TranslateService, injector: Injector): () => Promise<any> {
  return () =>
    new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        translateService.addLangs(environment.i18n.availableLangs);
        translateService.setDefaultLang(I18nService.userLang);
        translateService.use(I18nService.userLang);

        resolve(null);
      });
    });
}

@NgModule({
  declarations: [...appComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.token,
    }),
    GraphQLModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    PerfectScrollbarModule,
    PipesModule,
    SharedModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
