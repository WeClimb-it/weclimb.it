import { isDevMode, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { EntitiesListComponent } from './pages/entities-list/entities-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ContentType } from './utils/ContentType';

const routes: Routes = [
  { path: 'crags', component: EntitiesListComponent, data: { type: ContentType.CRAGS } },
  { path: 'crags/:slug', component: DetailComponent, data: { type: 'crag' } },

  { path: 'hikes', component: EntitiesListComponent, data: { type: ContentType.HIKES } },
  { path: 'hikes/:slug', component: DetailComponent, data: { type: 'hike' } },

  { path: 'shelters', component: EntitiesListComponent, data: { type: ContentType.SHELTERS } },
  { path: 'shelters/:slug', component: DetailComponent, data: { type: 'shelter' } },

  { path: 'places', component: EntitiesListComponent, data: { type: ContentType.PLACES } },
  { path: 'places/:slug', component: DetailComponent, data: { type: 'place' } },

  { path: 'competitions', component: EntitiesListComponent, data: { type: ContentType.COMPETITIONS } },
  { path: 'competitions/:slug', component: DetailComponent, data: { type: 'competition' } },

  { path: 'news', component: EntitiesListComponent, data: { type: ContentType.NEWS } },
  { path: 'news/:slug', component: DetailComponent, data: { type: 'news' } },

  { path: 'search/:query', component: SearchResultsComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false /* isDevMode() */ })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
