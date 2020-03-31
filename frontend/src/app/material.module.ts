import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { Ng5SliderModule } from 'ng5-slider';

/**
 * NgModule that includes all Material modules that are required to serve the app.
 */
@NgModule({
  exports: [
    ObserversModule,
    PlatformModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatDialogModule,
    Ng5SliderModule,
  ],
})
export class MaterialModule {}