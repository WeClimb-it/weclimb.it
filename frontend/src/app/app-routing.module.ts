import { isDevMode, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { EntitiesListComponent } from './pages/entities-list/entities-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ContentType } from './utils/ContentType';

/**
 * TODO: At the moment, using a paginated URL as landing page causes
 * a 404 in case the page exceed the pages count of the user location.
 * To solve this, we should add the geocords in the URL and use
 * them to override the user location in such a case.
 */
const routes: Routes = [
  { path: 'crags', component: EntitiesListComponent, data: { type: ContentType.CRAGS } },
  { path: 'crags/page/:page', component: EntitiesListComponent, data: { type: ContentType.CRAGS } },
  { path: 'crags/:slug', component: DetailComponent, data: { type: 'crag' } },

  { path: 'hikes', component: EntitiesListComponent, data: { type: ContentType.HIKES } },
  { path: 'hikes/page/:page', component: EntitiesListComponent, data: { type: ContentType.HIKES } },
  { path: 'hikes/:slug', component: DetailComponent, data: { type: 'hike' } },

  { path: 'shelters', component: EntitiesListComponent, data: { type: ContentType.SHELTERS } },
  { path: 'shelters/page/:page', component: EntitiesListComponent, data: { type: ContentType.SHELTERS } },
  { path: 'shelters/:slug', component: DetailComponent, data: { type: 'shelter' } },

  { path: 'places', component: EntitiesListComponent, data: { type: ContentType.PLACES } },
  { path: 'places/page/:page', component: EntitiesListComponent, data: { type: ContentType.PLACES } },
  { path: 'places/:slug', component: DetailComponent, data: { type: 'place' } },

  { path: 'competitions', component: EntitiesListComponent, data: { type: ContentType.COMPETITIONS } },
  { path: 'competitions/page/:page', component: EntitiesListComponent, data: { type: ContentType.COMPETITIONS } },
  { path: 'competitions/:slug', component: DetailComponent, data: { type: 'competition' } },

  { path: 'news', component: EntitiesListComponent, data: { type: ContentType.NEWS } },
  { path: 'news/page/:page', component: EntitiesListComponent, data: { type: ContentType.NEWS } },
  { path: 'news/:slug', component: DetailComponent, data: { type: 'news' } },

  { path: 'search/:query', component: SearchResultsComponent },
  { path: 'search/page/:query', component: SearchResultsComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false /* isDevMode() */ })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
