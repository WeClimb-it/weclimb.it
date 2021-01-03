import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe } from './capitalizeFirst/capitalize-first.pipe';
import { DistancePipe } from './distance/distance.pipe';
import { MetricPipe } from './metric/metric.pipe';

const pipes = [DistancePipe, CapitalizeFirstPipe, MetricPipe];

@NgModule({
  imports: [],
  exports: [...pipes],
  declarations: [...pipes],
  providers: [],
})
export class PipesModule {}
