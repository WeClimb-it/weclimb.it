import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './pages/detail/detail.component';
import { EntitiesListComponent } from './pages/entities-list/entities-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
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
  { path: 'crags/:slug', component: DetailComponent, data: { type: ContentType.CRAG, isFloatingContent: true } },

  { path: 'hikes', component: EntitiesListComponent, data: { type: ContentType.HIKES } },
  { path: 'hikes/page/:page', component: EntitiesListComponent, data: { type: ContentType.HIKES } },
  { path: 'hikes/:slug', component: DetailComponent, data: { type: ContentType.HIKE, isFloatingContent: true } },

  { path: 'shelters', component: EntitiesListComponent, data: { type: ContentType.SHELTERS } },
  { path: 'shelters/page/:page', component: EntitiesListComponent, data: { type: ContentType.SHELTERS } },
  { path: 'shelters/:slug', component: DetailComponent, data: { type: ContentType.SHELTER, isFloatingContent: true } },

  { path: 'places', component: EntitiesListComponent, data: { type: ContentType.PLACES } },
  { path: 'places/page/:page', component: EntitiesListComponent, data: { type: ContentType.PLACES } },
  { path: 'places/:slug', component: DetailComponent, data: { type: ContentType.PLACE, isFloatingContent: true } },

  { path: 'competitions', component: EntitiesListComponent, data: { type: ContentType.COMPETITIONS } },
  { path: 'competitions/page/:page', component: EntitiesListComponent, data: { type: ContentType.COMPETITIONS } },
  {
    path: 'competitions/:slug',
    component: DetailComponent,
    data: { type: ContentType.COMPETITION, isFloatingContent: true },
  },

  { path: 'news', component: EntitiesListComponent, data: { type: ContentType.NEWS } },
  { path: 'news/page/:page', component: EntitiesListComponent, data: { type: ContentType.NEWS } },
  // Not supported yet
  // { path: 'news/:slug', component: DetailComponent, data: { type: ContentType.ONE_NEWS, isFloatingContent: true } },

  { path: 'pois/:nodeId', component: DetailComponent, data: { type: ContentType.OSM_NODE, isFloatingContent: true } },

  { path: 'search/:query', component: EntitiesListComponent, data: { type: ContentType.SEARCH } },
  { path: 'search/:query/page/:page', component: EntitiesListComponent, data: { type: ContentType.SEARCH } },

  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false /* isDevMode() */, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
