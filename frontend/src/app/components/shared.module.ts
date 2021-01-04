import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';

const components = [LoaderComponent];

@NgModule({
  imports: [],
  exports: [...components],
  declarations: [...components],
  providers: [],
})
export class SharedModule {}
