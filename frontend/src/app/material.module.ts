import { NgModule } from '@angular/core';

import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

/**
 * NgModule that includes all Material modules that are required to serve the app.
 */
@NgModule({
  exports: [ObserversModule, PlatformModule],
})
export class MaterialModule {}
